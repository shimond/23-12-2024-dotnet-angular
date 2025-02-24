namespace CatalogApi.Models.Config;

public class JwtInfo
{
    public string Id { get; set; }
    public string Issuer { get; set; }
    public string Value { get; set; }
    public int Length { get; set; }
}



public class BearerInfo
{
    public string[] ValidAudiences { get; set; }
    public string ValidIssuer { get; set; }
}
