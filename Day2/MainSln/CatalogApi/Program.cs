using CatalogApi.Apis;
using CatalogApi.DataContext;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(x => x.AddDefaultPolicy(o => o.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin()));
builder.Services.AddDbContext<CatalogDataContext>(x => x.UseInMemoryDatabase("MyDb"));
builder.Services.AddEndpointsApiExplorer(); // minimal api support
builder.Services.AddValidatorsFromAssemblyContaining<Product>();
builder.Services.AddScoped<IProductsRepository, ProductsRepository>();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseCors();
app.UseSwagger();
app.UseSwaggerUI();
app.MapProduts();

app.Run();
