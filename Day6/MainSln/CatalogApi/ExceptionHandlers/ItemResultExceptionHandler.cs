using CatalogApi.Exceptions;
using Microsoft.AspNetCore.Diagnostics;

namespace CatalogApi.ExceptionHandlers
{
    public class ItemResultExceptionHandler : IExceptionHandler
    {
        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            if(exception is ItemResultException ex)
            {
                if(ex.ExceptionType == ItemResultExceptionType.NotFound)
                {
                    httpContext.Response.StatusCode = (int)ItemResultExceptionType.NotFound;
                    await httpContext.Response.WriteAsync("404");
                }
                if (ex.ExceptionType == ItemResultExceptionType.Conflict)
                {
                    httpContext.Response.StatusCode = (int)ItemResultExceptionType.Conflict;
                    await httpContext.Response.WriteAsync("409");
                }
                return true;
            }
            return false;
        }
    }
}
