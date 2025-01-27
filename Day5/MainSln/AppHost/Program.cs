using Projects;

var builder = DistributedApplication.CreateBuilder(args);



var sqlServer = builder.AddSqlServer("sqlserevrEngine")
    .WithDataVolume("sql-server-data");
var db = sqlServer.AddDatabase("myCatalogDb", "catalogDb");

var catalogApi = builder.AddProject<CatalogApi>("catalogApi");
catalogApi.WithReference(db);

var bff = builder.AddProject<BFF>("bff");
bff.WithReference(catalogApi);

builder.Build().Run();
