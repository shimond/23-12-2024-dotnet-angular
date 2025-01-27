using TestLogs.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ManagerService>();
builder.Services.AddHttpLogging(x=>x.LoggingFields = Microsoft.AspNetCore.HttpLogging.HttpLoggingFields.RequestPath | Microsoft.AspNetCore.HttpLogging.HttpLoggingFields.RequestQuery);
var app = builder.Build();


app.UseHttpLogging();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.MapGet("/test/{id}",  async(int id, ManagerService  service) =>
{
    var res = await service.GetTheValue(id);
    return res;
});
app.Run();
