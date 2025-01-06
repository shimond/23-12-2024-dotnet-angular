using CatalogApi.DataContext;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace CatalogApi.Services;


public class ProductsRepository(
    ILogger<ProductsRepository> logger,
    CatalogDataContext catalogDataContext) : IProductsRepository
{
    public async Task<Product> AddNewProduct(Product p)
    {
        var stopwatch = Stopwatch.StartNew();
        logger.LogTrace("Trace test");
        logger.LogInformation("Starting AddNewProduct at {StartTime}", DateTime.UtcNow);

        catalogDataContext.Products.Add(p);
        await catalogDataContext.SaveChangesAsync();

        stopwatch.Stop();
        logger.LogInformation("Finished AddNewProduct at {EndTime} (Duration: {Duration}ms)", DateTime.UtcNow, stopwatch.ElapsedMilliseconds);
        return p;
    }

    public async Task<List<Product>> GetAllProducts()
    {
        var stopwatch = Stopwatch.StartNew();
        logger.LogInformation("Starting GetAllProducts at {StartTime}", DateTime.UtcNow);

        var products = await catalogDataContext.Products.ToListAsync();

        stopwatch.Stop();
        logger.LogInformation("Finished GetAllProducts at {EndTime} (Duration: {Duration}ms)", DateTime.UtcNow, stopwatch.ElapsedMilliseconds);
        return products;
    }

    public async Task<Product?> GetProductById(int id)
    {
        var stopwatch = Stopwatch.StartNew();
        logger.LogInformation("Starting GetProductById at {StartTime}", DateTime.UtcNow);

        var p = await catalogDataContext.Products.FirstOrDefaultAsync(x => x.Id == id);

        stopwatch.Stop();
        logger.LogInformation("Finished GetProductById at {EndTime} (Duration: {Duration}ms)", DateTime.UtcNow, stopwatch.ElapsedMilliseconds);
        return p;
    }
}
