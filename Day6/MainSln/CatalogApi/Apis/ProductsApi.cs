using CatalogApi.Filters;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc.Razor.Internal;

namespace CatalogApi.Apis;

public static class ProductsApi
{
    public static IEndpointRouteBuilder MapProduts(this IEndpointRouteBuilder endpoints)
    {
        //var productsGroup = endpoints.MapGroup("api/products")
        //    .WithTags("Products")
        //    .AddEndpointFilter(async (context, next) =>
        //    {
        //        var typesToCheckValidation = context.Arguments;
        //        foreach (var arg in typesToCheckValidation)
        //        {
        //            var type = arg.GetType();
        //            var openType = typeof(IValidator<>);
        //            var ivalidator = openType.MakeGenericType(type);
        //            var validator = context.HttpContext.RequestServices.GetService(ivalidator);
        //            if (validator != null)
        //            {
        //                var valRes =  validator.GetType().GetMethod("Validate", [type]).Invoke(validator, [arg]) as ValidationResult;
        //                if(!valRes.IsValid)
        //                {
        //                    return TypedResults.BadRequest(valRes.Errors);
        //                }
        //            }
        //        }
        //        var res = await next(context);
        //        return res;
        //    });

        var productsGroup = endpoints.MapGroup("api/products")
            .WithTags("Products")
            .AddEndpointFilter<ValidationEndPointFilter>();

        productsGroup.MapPost("", AddNewProduct).RequireAuthorization();
        productsGroup.MapPost("Range", AddProducts);
        productsGroup.MapGet("", GetAllProducts);
        productsGroup.MapGet("{id}", GetProductById);

        return endpoints;
    }

    private static async Task<IResult> AddProducts(IHttpContextAccessor httpContextAccessor,  IProductsRepository repository, Product[] products)
    {
        foreach (var p in products)
        {
            var newProduct = await repository.AddNewProduct(p);
        }
        return Results.Ok();
    }

    private static async Task<Ok<List<Product>>> GetAllProducts(IProductsRepository repository)
    {
        var products = await repository.GetAllProducts();
        return TypedResults.Ok(products);
    }

    private static async Task<Results<Ok<Product>, NotFound>> GetProductById(int id, IProductsRepository repository)
    {
        var product = await repository.GetProductById(id);
        return TypedResults.Ok(product);
    }

    private static async Task<Results<Created<Product>, ValidationProblem>> AddNewProduct(Product p,
        IProductsRepository repository,
        IValidator<Product> validator)
    {
        var res = await validator.ValidateAsync(p);
        if (res.IsValid)
        {
            var newProduct = await repository.AddNewProduct(p);
            return TypedResults.Created("" + newProduct.Id, newProduct);
        }

        var erros = res.Errors.GroupBy(x => x.PropertyName)
            .Select(x => new { FieldName = x.Key, Errors = x.ToList() })
            .ToDictionary(x => x.FieldName, x => x.Errors.Select(o => o.ErrorMessage).ToArray());

        return TypedResults.ValidationProblem(erros);
    }

}
