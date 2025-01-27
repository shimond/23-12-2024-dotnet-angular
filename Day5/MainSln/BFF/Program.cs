var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults(); 
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddServiceDiscovery();

builder.Services.ConfigureHttpClientDefaults(static http =>
{
    // Turn on service discovery by default
    http.AddServiceDiscovery();
});

builder.Services.AddHttpClient();


var app = builder.Build();
app.MapDefaultEndpoints();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.MapGet("/api/getAllProducts", async (HttpClient client) =>
{
    var result  = await client.GetStringAsync("http://catalogApi/api/products");
    return Results.Ok(result);
});

app.Run();
