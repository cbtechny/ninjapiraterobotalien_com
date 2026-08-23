[CmdletBinding()]
param(
    [Parameter()]
    [string]$SourcePath = ""
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Get-NormalizedPath {
    param([Parameter(Mandatory = $true)][string]$Path)

    return [System.IO.Path]::GetFullPath($Path).TrimEnd(
        [System.IO.Path]::DirectorySeparatorChar,
        [System.IO.Path]::AltDirectorySeparatorChar
    )
}

function Assert-GeneratedExport {
    param([Parameter(Mandatory = $true)][string]$ExportPath)

    $indexPath = Join-Path $ExportPath "index.html"
    if (-not (Test-Path -LiteralPath $indexPath -PathType Leaf)) {
        throw "Missing generated index.html in '$ExportPath'."
    }

    $indexHtml = Get-Content -LiteralPath $indexPath -Raw
    $configMatch = [regex]::Match(
        $indexHtml,
        '(?m)^const GODOT_CONFIG = (?<json>\{.+\});\s*$'
    )
    if (-not $configMatch.Success) {
        throw "index.html does not contain a generated GODOT_CONFIG object."
    }

    try {
        $config = $configMatch.Groups["json"].Value | ConvertFrom-Json
    }
    catch {
        throw "index.html contains an invalid GODOT_CONFIG object: $($_.Exception.Message)"
    }

    $executable = [string]$config.executable
    if ([string]::IsNullOrWhiteSpace($executable)) {
        throw "GODOT_CONFIG does not declare an executable basename."
    }

    if ($executable -ne "index") {
        throw "Expected the Godot export basename to be 'index', found '$executable'."
    }

    $requiredFiles = @(
        "index.html",
        "$executable.js",
        "$executable.pck",
        "$executable.wasm",
        "$executable.png",
        "$executable.audio.worklet.js",
        "$executable.audio.position.worklet.js"
    )

    foreach ($relativePath in $requiredFiles) {
        $requiredPath = Join-Path $ExportPath $relativePath
        if (-not (Test-Path -LiteralPath $requiredPath -PathType Leaf)) {
            throw "Missing required Godot Web export file '$relativePath'."
        }
        if ((Get-Item -LiteralPath $requiredPath).Length -le 0) {
            throw "Required Godot Web export file '$relativePath' is empty."
        }
    }

    if ($indexHtml -notmatch ('src="' + [regex]::Escape("$executable.js") + '"')) {
        throw "index.html does not reference '$executable.js'."
    }
    if ($indexHtml -notmatch ('src="' + [regex]::Escape("$executable.png") + '"')) {
        throw "index.html does not reference '$executable.png'."
    }

    foreach ($extension in @("pck", "wasm")) {
        $fileName = "$executable.$extension"
        $sizeProperty = $config.fileSizes.PSObject.Properties[$fileName]
        if ($null -eq $sizeProperty) {
            throw "GODOT_CONFIG.fileSizes does not declare '$fileName'."
        }

        $declaredSize = [long]$sizeProperty.Value
        $actualSize = (Get-Item -LiteralPath (Join-Path $ExportPath $fileName)).Length
        if ($declaredSize -ne $actualSize) {
            throw "Size mismatch for '$fileName': GODOT_CONFIG declares $declaredSize bytes, actual file is $actualSize bytes."
        }
    }

    $unsafeItems = Get-ChildItem -LiteralPath $ExportPath -Recurse -Force | Where-Object {
        ($_.Attributes -band [System.IO.FileAttributes]::ReparsePoint) -or
        $_.Name.EndsWith(".import", [System.StringComparison]::OrdinalIgnoreCase) -or
        $_.Name.EndsWith(".tmp", [System.StringComparison]::OrdinalIgnoreCase) -or
        $_.Name.EndsWith(".part", [System.StringComparison]::OrdinalIgnoreCase)
    }
    if ($unsafeItems) {
        $unsafeNames = ($unsafeItems | ForEach-Object FullName) -join ", "
        throw "Export contains unsupported temporary files or reparse points: $unsafeNames"
    }

    return $config
}

function Get-FileManifest {
    param([Parameter(Mandatory = $true)][string]$RootPath)

    $prefix = $RootPath + [System.IO.Path]::DirectorySeparatorChar
    $manifest = @{}
    foreach ($file in Get-ChildItem -LiteralPath $RootPath -Recurse -File -Force) {
        $relativePath = $file.FullName.Substring($prefix.Length).Replace("\", "/")
        $manifest[$relativePath] = [pscustomobject]@{
            Length = $file.Length
            Hash = (Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash
        }
    }
    return $manifest
}

function Assert-ManifestsMatch {
    param(
        [Parameter(Mandatory = $true)][hashtable]$Expected,
        [Parameter(Mandatory = $true)][hashtable]$Actual
    )

    $expectedNames = @($Expected.Keys | Sort-Object)
    $actualNames = @($Actual.Keys | Sort-Object)
    if (($expectedNames -join "`n") -ne ($actualNames -join "`n")) {
        throw "Staged build file list does not match the source export."
    }

    foreach ($name in $expectedNames) {
        if ($Expected[$name].Length -ne $Actual[$name].Length -or
            $Expected[$name].Hash -ne $Actual[$name].Hash) {
            throw "Staged build does not byte-match source file '$name'."
        }
    }
}

$repoRoot = Get-NormalizedPath (Join-Path $PSScriptRoot "..")
$targetPath = Get-NormalizedPath (Join-Path $repoRoot "play\sackjack\build")
$expectedTargetPath = Get-NormalizedPath (Join-Path $repoRoot "play\sackjack\build")

if (-not [System.StringComparer]::OrdinalIgnoreCase.Equals($targetPath, $expectedTargetPath)) {
    throw "Refusing to use an unexpected deployment target '$targetPath'."
}

if ([string]::IsNullOrWhiteSpace($SourcePath)) {
    $SourcePath = Join-Path $repoRoot "..\Sackjack-MOBILE\sackjack-mobile-main\build\web"
}
if (-not (Test-Path -LiteralPath $SourcePath -PathType Container)) {
    throw "Sackjack Web export directory not found: '$SourcePath'."
}

$resolvedSourcePath = Get-NormalizedPath (Resolve-Path -LiteralPath $SourcePath).Path
if ([System.StringComparer]::OrdinalIgnoreCase.Equals($resolvedSourcePath, $targetPath)) {
    throw "The source export and deployment target must be different directories."
}

Assert-GeneratedExport -ExportPath $resolvedSourcePath | Out-Null
$sourceManifest = Get-FileManifest -RootPath $resolvedSourcePath

$targetParent = Split-Path -Parent $targetPath
New-Item -ItemType Directory -Force -Path $targetParent | Out-Null

$transactionId = [guid]::NewGuid().ToString("N")
$stagePath = Join-Path $targetParent ".build-stage-$transactionId"
$backupPath = Join-Path $targetParent ".build-backup-$transactionId"
$targetWasBackedUp = $false
$replacementCompleted = $false

try {
    New-Item -ItemType Directory -Path $stagePath | Out-Null
    Get-ChildItem -LiteralPath $resolvedSourcePath -Force | Copy-Item -Destination $stagePath -Recurse -Force

    Assert-GeneratedExport -ExportPath $stagePath | Out-Null
    $stageManifest = Get-FileManifest -RootPath $stagePath
    Assert-ManifestsMatch -Expected $sourceManifest -Actual $stageManifest

    if (Test-Path -LiteralPath $targetPath) {
        Move-Item -LiteralPath $targetPath -Destination $backupPath
        $targetWasBackedUp = $true
    }

    Move-Item -LiteralPath $stagePath -Destination $targetPath
    $replacementCompleted = $true

    if ($env:SACKJACK_IMPORT_TEST_FAIL_AFTER_SWAP -eq "1") {
        throw "Simulated post-swap failure for rollback verification."
    }

    Assert-GeneratedExport -ExportPath $targetPath | Out-Null
    $deployedManifest = Get-FileManifest -RootPath $targetPath
    Assert-ManifestsMatch -Expected $sourceManifest -Actual $deployedManifest

    if ($targetWasBackedUp -and (Test-Path -LiteralPath $backupPath)) {
        Remove-Item -LiteralPath $backupPath -Recurse -Force
        $targetWasBackedUp = $false
    }
}
catch {
    if ($replacementCompleted -and (Test-Path -LiteralPath $targetPath)) {
        Remove-Item -LiteralPath $targetPath -Recurse -Force
    }
    if ($targetWasBackedUp -and (Test-Path -LiteralPath $backupPath)) {
        Move-Item -LiteralPath $backupPath -Destination $targetPath
        $targetWasBackedUp = $false
    }
    throw
}
finally {
    if (Test-Path -LiteralPath $stagePath) {
        Remove-Item -LiteralPath $stagePath -Recurse -Force
    }
}

Write-Output "Imported Sackjack Web export into '$targetPath'."
Write-Output ("Verified {0} files against the source export with SHA-256." -f $sourceManifest.Count)
