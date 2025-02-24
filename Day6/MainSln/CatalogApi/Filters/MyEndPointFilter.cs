
using FluentValidation;
using FluentValidation.Results;

namespace CatalogApi.Filters;

public class ValidationEndPointFilter : IEndpointFilter
{
    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        var typesToCheckValidation = context.Arguments;
        foreach (var arg in typesToCheckValidation)
        {
            var type = arg.GetType();
            var openType = typeof(IValidator<>);
            var ivalidator = openType.MakeGenericType(type);
            var validator = context.HttpContext.RequestServices.GetService(ivalidator);
            if (validator != null)
            {
                var valRes = validator.GetType().GetMethod("Validate", [type]).Invoke(validator, [arg]) as ValidationResult;
                if (!valRes.IsValid)
                {
                    return TypedResults.BadRequest(valRes.Errors);
                }
            }
        }
        var res = await next(context);
        return res;
    }
}
