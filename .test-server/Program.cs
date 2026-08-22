var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var siteRoot = Path.GetFullPath(Path.Combine(app.Environment.ContentRootPath, ".."));
app.UseDefaultFiles(new DefaultFilesOptions { FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(siteRoot) });
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(siteRoot),
    ServeUnknownFileTypes = true,
    DefaultContentType = "application/octet-stream",
});

app.Run();
