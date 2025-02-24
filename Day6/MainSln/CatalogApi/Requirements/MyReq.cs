using Microsoft.AspNetCore.Authorization;

namespace CatalogApi.Requirements;

public class MyRequirement : IAuthorizationRequirement
{
    public int MaxdayLimit { get; set; }
}

public class MyRequirementHandler : AuthorizationHandler<MyRequirement>
{
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, MyRequirement requirement)
    {   
        context.Succeed(requirement);
        //context.Fail();
    }
}


public class ShimonRequirement : IAuthorizationRequirement
{
    public int MaxdayLimit { get; set; }
}

public class ShimonRequirementHandler : AuthorizationHandler<ShimonRequirement>
{
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, ShimonRequirement requirement)
    {
        context.Succeed(requirement);
        //context.Fail();
    }
}
