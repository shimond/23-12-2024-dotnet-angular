using CatalogApi.Filters;
using CatalogApi.Models.Config;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using static Microsoft.IO.RecyclableMemoryStreamManager;

namespace CatalogApi.Apis;

public static class AuthApi
{
    public static IEndpointRouteBuilder MapAuth(this IEndpointRouteBuilder endpoints)
    {
        var authGroup = endpoints.MapGroup("api/auth")
            .WithTags("auth");

        authGroup.MapPost("login", Login);

        return endpoints;
    }

    private static async Task<IResult> Login(LoginRequest loginRequest, IOptions<List<JwtInfo>> jwts, IOptions<BearerInfo> bearer)
    {
        if (loginRequest.userName == "david" && loginRequest.password == "1234")
        {
            var audiences = bearer.Value.ValidAudiences;
            var tokenHandler = new JwtSecurityTokenHandler();
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, loginRequest.userName),
                new Claim(JwtRegisteredClaimNames.Sub, loginRequest.userName),
                new Claim(ClaimTypes.Role, "Admin")
            };

            foreach (var aud in audiences)
            {
                claims.Add(new Claim(JwtRegisteredClaimNames.Aud, aud));
            }

            var jwtInfo = jwts.Value.First();
            var key = jwtInfo.Value;
            var keyMaterial = new byte[32];
            Convert.TryFromBase64String(key, keyMaterial, out var bytesWritten);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Issuer = jwtInfo.Issuer,
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(keyMaterial), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            return Results.Ok(new { Token = tokenString });
        }

        return Results.Unauthorized();

    }
}
