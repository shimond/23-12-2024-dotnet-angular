using CatalogApi.Apis;
using CatalogApi.DataContext;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<CatalogDataContext>(x => x.UseInMemoryDatabase("MyDb"));
builder.Services.AddEndpointsApiExplorer(); // minimal api support
//builder.Logging.AddSeq();
builder.Services.AddValidatorsFromAssemblyContaining<Product>();
builder.Services.AddScoped<IProductsRepository, ProductsRepository>();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();

app.MapProduts();
app.MapGet("Test", () =>
{
    return "asd";
});

app.Run();
