using FluentValidation;
using Microsoft.AspNetCore.Rewrite;

namespace CatalogApi.Validations;

public class ProductValidator : AbstractValidator<Product>
{
    public ProductValidator()
    {
        RuleFor(x=> x.Name).NotEmpty()
            .Must(x=> x.StartsWith("A"))
            .MinimumLength(2);
        
        RuleFor(x => x.price).GreaterThan(0);
    }
}
