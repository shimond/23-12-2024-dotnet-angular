using CatalogApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace CatalogApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConfigurationController : ControllerBase
    {
        private readonly IOptions<TimeoutOptions> _options;
        private readonly IConfiguration _configuration;

        public ConfigurationController(IConfiguration configuration, IOptionsSnapshot<TimeoutOptions> options)
        {
            _options = options;
            _configuration = configuration;
        }

        [HttpGet]
        public Task<IActionResult> GetFromConfig()
        {
            var value = _configuration["TestSetting:currentValue"];
            return Task.FromResult(Ok(value) as IActionResult);
        }

        [HttpGet(nameof(GetFromConfigPath))]
        public Task<IActionResult> GetFromConfigPath()
        {
            var value = _configuration["PATH"];
            return Task.FromResult(Ok(value) as IActionResult);
        }
        [HttpGet(nameof(GetFromConfigOptions))]

        public Task<IActionResult> GetFromConfigOptions()
        {
            return Task.FromResult(Ok(_options) as IActionResult);
        }


    }
}
