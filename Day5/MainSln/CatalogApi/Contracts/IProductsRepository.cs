using CatalogApi.Models;

namespace CatalogApi.Contracts;

public interface IProductsRepository
{
    Task<List<Product>> GetAllProducts();
    Task<Product?> GetProductById(int id);
    Task<Product> AddNewProduct(Product p);
}
