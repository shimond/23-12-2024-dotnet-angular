using CatalogApi.Contracts;
using CatalogApi.Models;
using Microsoft.AspNetCore.OutputCaching;

namespace CatalogApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly IProductsRepository _productsRepository;

    public ProductsController(IProductsRepository productsRepository)
    {
        this._productsRepository = productsRepository;
    }
    [HttpGet]
    [OutputCache(Duration = 60)]
    public async Task<IActionResult> GetAllProducts()
    {
        var products = await _productsRepository.GetAllProducts();
        return Ok(products);
    }



    [HttpPost]
    public async Task<IActionResult> AddProduct(Product p)
    {
        await Task.Delay(1000);
        var newPRoduct = p with { Id = Random.Shared.Next(9,290922) };
        return Ok(newPRoduct);
    }


}
