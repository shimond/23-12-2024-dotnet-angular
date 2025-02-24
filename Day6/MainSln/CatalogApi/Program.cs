using CatalogApi.Apis;
using CatalogApi.DataContext;
using CatalogApi.ExceptionHandlers;
using CatalogApi.Exceptions;
using CatalogApi.Middlewares;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.AddServiceDefaults();
builder.Services.AddAuthentication();
builder.Services.AddAuthorization();
builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<ItemResultExceptionHandler>();

builder.Services.AddCors(x => x.AddDefaultPolicy(o => o.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin()));
var conStr = builder.Configuration.GetConnectionString("myCatalogDb");

builder.Services.AddDbContext<CatalogDataContext>(x => x.UseSqlServer(conStr));
builder.Services.AddEndpointsApiExplorer(); // minimal api support
builder.Services.AddValidatorsFromAssemblyContaining<Product>();
builder.Services.AddScoped<IProductsRepository, ProductsRepository>();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseAuthentication();
app.UseAuthorization();
app.UseMyMiddleware();
app.UseExceptionHandler();
app.MapDefaultEndpoints();
var db = app.Services.CreateScope().ServiceProvider.GetRequiredService<CatalogDataContext>();
await db.Database.EnsureCreatedAsync();

app.UseCors();
app.UseSwagger();
app.UseSwaggerUI();
app.MapProduts();

app.Run();
