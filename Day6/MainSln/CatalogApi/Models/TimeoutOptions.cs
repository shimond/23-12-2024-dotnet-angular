namespace CatalogApi.Models;

public class TimeoutOptions
{
    public int RequestTimeOut { get; set; }
    public int ResponseTimeOut { get; set; }
    public int Default { get; set; }
    public string[] Urls { get; set; }
}
