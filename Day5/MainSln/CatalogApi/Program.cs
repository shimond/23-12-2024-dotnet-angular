using CatalogApi.Apis;
using CatalogApi.DataContext;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.AddServiceDefaults();

builder.Services.AddCors(x => x.AddDefaultPolicy(o => o.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin()));
var conStr = builder.Configuration.GetConnectionString("myCatalogDb");

builder.Services.AddDbContext<CatalogDataContext>(x => x.UseSqlServer(conStr));
builder.Services.AddEndpointsApiExplorer(); // minimal api support
builder.Services.AddValidatorsFromAssemblyContaining<Product>();
builder.Services.AddScoped<IProductsRepository, ProductsRepository>();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.MapDefaultEndpoints();
var db = app.Services.CreateScope().ServiceProvider.GetRequiredService<CatalogDataContext>();
//await db.Database.EnsureCreatedAsync();

app.UseCors();
app.UseSwagger();
app.UseSwaggerUI();
app.MapProduts();

app.Run();
