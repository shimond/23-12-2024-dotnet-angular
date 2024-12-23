using CatalogApi.Contracts;
using CatalogApi.Middlewares;
using CatalogApi.Services;

var builder = WebApplication.CreateBuilder(args);
//builder.Services.AddScoped<Test>();
builder.Services.AddScoped<IProductsRepository, ProductsRepository>();
//builder.Services.AddScoped<IProductsRepository, ProductsRepository>();
//builder.Services.AddTransient<IProductsRepository, ProductsRepository>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddOutputCache();   // in memory output cache

var app = builder.Build();
app.UseMyMiddleware();
app.UseOutputCache();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();
app.Run();


//app.UseStaticFiles();

//app.Use(async (context, next) => { 
//    await context.Response.WriteAsync("MID 1 A"); //1
//    await next();
//    await context.Response.WriteAsync("MID 1 B"); //5
//});

//app.Use(async (context, next) => {
//    await context.Response.WriteAsync("MID 2 A"); //2
//    await next();
//    await context.Response.WriteAsync("MID 2 B"); //4
//});


//app.Run(async (context) =>
//{
//    await context.Response.WriteAsync(" WOW !"); //3
//});
