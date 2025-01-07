using Azure.Identity;
using KShoppeMVC.Models.DB;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<MyDBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("https://calm-beach-075714400.4.azurestaticapps.net")
                            .AllowAnyMethod()
                            .AllowAnyHeader());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("AllowSpecificOrigin");
app.UseAuthorization();

// Serve static files (for React built files)
app.UseStaticFiles();

// Configure React SPA integration
//app.UseSpa(spa =>
//{
//    spa.Options.SourcePath = "clientapp"; // Path to your React app's source

//    if (app.Environment.IsDevelopment())
//    {
//        spa.UseProxyToSpaDevelopmentServer("http://localhost:5000"); // React dev server
//    }
//});

// Map controller routes
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
