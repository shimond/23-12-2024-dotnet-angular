using CatalogApi.Apis;
using CatalogApi.DataContext;
using CatalogApi.ExceptionHandlers;
using CatalogApi.Exceptions;
using CatalogApi.Middlewares;
using CatalogApi.Models.Config;
using CatalogApi.Requirements;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.Configure<List<JwtInfo>>(builder.Configuration.GetSection("Authentication:Schemes:Bearer:SigningKeys"));
builder.Services.Configure<BearerInfo>(builder.Configuration.GetSection("Authentication:Schemes:Bearer"));

builder.AddServiceDefaults();
builder.Services.AddHttpContextAccessor();

builder.Services.AddAuthentication("Bearer").AddJwtBearer(o =>
{
    o.Events = new Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerEvents()
    {
        OnTokenValidated = (context) =>
        {
            return Task.CompletedTask;
        },
        OnAuthenticationFailed = (context) =>
        {
            return Task.CompletedTask;
        }
    };

});

builder.Services.AddAuthorization(x =>
{
    x.AddPolicy("Admin", x => x.RequireRole("Admin"));
    x.AddPolicy("WithReq", x => x.Requirements.Add(new MyRequirement() { MaxdayLimit = 10 }));
    x.AddPolicy("WithReq2", x => x.Requirements.Add(new ShimonRequirement() { MaxdayLimit = 10 }));
});


builder.Services.AddSingleton<IAuthorizationHandler, MyRequirementHandler>();
builder.Services.AddScoped<IAuthorizationHandler, ShimonRequirementHandler>();
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
app.UseCors();
app.UseExceptionHandler();
app.MapDefaultEndpoints();
var db = app.Services.CreateScope().ServiceProvider.GetRequiredService<CatalogDataContext>();
await db.Database.EnsureCreatedAsync();

app.UseSwagger();
app.UseSwaggerUI();
app.UseAuthentication();
app.UseAuthorization();
app.UseMyMiddleware();
app.MapAuth();
app.MapProduts();

app.MapGet("withreq1", () =>
{
    return Results.Ok("withreq1");
}).RequireAuthorization("WithReq"); ;

app.MapGet("withreq2", () =>
{
    return Results.Ok("withreq2");
}).RequireAuthorization("WithReq2");

app.Run();
