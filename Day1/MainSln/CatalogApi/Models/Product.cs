using Microsoft.AspNetCore.Mvc;

namespace CatalogApi.Models;

public record Product(int Id, string Name, string Description, decimal? price);

//public record Product
//{
//    public required int Id { get; init; }
//    public required string Name { get; init; }
//    public string? Description { get; init; }
//    public decimal Price { get; init; }
//}

