using Azure.Identity;
using KShoppeMVC.Models.DB;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
// Use Azure.Identity to authenticate with Azure SQL Server
//var azureCredential = new DefaultAzureCredential();
//var sqlConnection = new SqlConnection(builder.Configuration.GetConnectionString("DefaultConnection"))
//{
//    AccessToken = azureCredential.GetToken(
//        new Azure.Core.TokenRequestContext(
//            new[] { "https://database.windows.net/.default" })).Token
//};

builder.Services.AddDbContext<MyDBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("https://kshoppe-b9bgg2a4a4adgvg3.southeastasia-01.azurewebsites.net") // React app's origin
                .AllowAnyHeader()
                .AllowAnyMethod();
    });
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
app.UseCors();
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
