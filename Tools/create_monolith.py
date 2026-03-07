from __future__ import annotations

"""Generate a monolithic Markdown snapshot of repository text source files."""

from pathlib import Path

INCLUDED_EXTENSIONS = {
    ".html",
    ".css",
    ".js",
    ".md",
    ".txt",
    ".json",
    ".yml",
    ".yaml",
}

EXCLUDED_DIR_NAMES = {
    ".git",
    "Tools",
    "node_modules",
    "dist",
    "build",
    "venv",
    ".venv",
    "__pycache__",
}

EXCLUDED_FILE_NAMES = {
    "monolith.md",
}

LANGUAGE_MAP = {
    ".html": "html",
    ".css": "css",
    ".js": "javascript",
    ".md": "md",
    ".txt": "text",
    ".json": "json",
    ".yml": "yaml",
    ".yaml": "yaml",
}


def get_project_root() -> Path:
    """Return the repository root based on this script's location."""
    return Path(__file__).resolve().parent.parent


def should_exclude(path: Path, project_root: Path) -> bool:
    """Return True when a path should be ignored based on configured exclusions."""
    relative_parts = path.relative_to(project_root).parts

    if any(part in EXCLUDED_DIR_NAMES for part in relative_parts[:-1]):
        return True

    if path.name in EXCLUDED_FILE_NAMES:
        return True

    return False


def discover_files(project_root: Path) -> list[Path]:
    """Collect all included files under the project root in deterministic order."""
    discovered: list[Path] = []

    for path in project_root.rglob("*"):
        if not path.is_file():
            continue

        if should_exclude(path, project_root):
            continue

        if path.suffix.lower() not in INCLUDED_EXTENSIONS:
            continue

        discovered.append(path)

    return sorted(discovered, key=lambda p: p.relative_to(project_root).as_posix())


def read_text_file(path: Path) -> tuple[str | None, bool]:
    """Read a text file robustly; return content and whether it was skipped."""
    try:
        return path.read_text(encoding="utf-8"), False
    except UnicodeDecodeError:
        try:
            return path.read_text(encoding="utf-8", errors="replace"), False
        except OSError:
            return None, True
    except OSError:
        return None, True


def language_for_extension(path: Path) -> str:
    """Map file extension to markdown code fence language."""
    return LANGUAGE_MAP.get(path.suffix.lower(), "text")


def write_monolith(project_root: Path, file_paths: list[Path], output_path: Path) -> tuple[int, int]:
    """Write the monolith file and return processed/skipped counts."""
    processed_count = 0
    skipped_count = 0

    with output_path.open("w", encoding="utf-8") as out_file:
        for file_path in file_paths:
            content, skipped = read_text_file(file_path)
            if skipped or content is None:
                skipped_count += 1
                continue

            relative_path = file_path.relative_to(project_root).as_posix()
            language = language_for_extension(file_path)

            out_file.write(f"### {relative_path}\n\n")
            out_file.write(f"```{language}\n")
            out_file.write(content)
            if content and not content.endswith("\n"):
                out_file.write("\n")
            out_file.write("```\n\n")
            out_file.write("---\n\n")

            processed_count += 1

    return processed_count, skipped_count


def main() -> None:
    """Entrypoint for monolith generation."""
    project_root = get_project_root()
    output_path = project_root / "monolith.md"

    file_paths = discover_files(project_root)
    processed_count, skipped_count = write_monolith(project_root, file_paths, output_path)

    print(f"Project root: {project_root}")
    print(f"Output file: {output_path}")
    print(f"Files processed: {processed_count}")
    print(f"Files skipped: {skipped_count}")
    print("Monolith generation complete.")


if __name__ == "__main__":
    main()
