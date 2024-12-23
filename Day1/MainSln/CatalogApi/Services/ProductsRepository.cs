using CatalogApi.Contracts;
using CatalogApi.Models;

namespace CatalogApi.Services;

public class ProductsRepository : IProductsRepository
{
    public Task<Product> AddNewProduct(Product p)
    {
        return Task.FromResult(p);
    }

    public Task<List<Product>> GetAllProducts()
    {
        return Task.FromResult(new List<Product>());
    }

    public Task<Product?> GetProductById(int id)
    {
        return Task.FromResult<Product?>(null);
    }
}
