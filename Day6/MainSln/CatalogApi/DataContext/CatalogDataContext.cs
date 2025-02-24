using Microsoft.EntityFrameworkCore;

namespace CatalogApi.DataContext;

public class CatalogDataContext : DbContext
{
    public DbSet<Product> Products { get; set; }

    public CatalogDataContext(DbContextOptions<CatalogDataContext> options) : base(options)
    {
            
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}
