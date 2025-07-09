using BinasCesar.Core.DTOs;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BinasCesar.Application.Services;

/// <summary>
/// Servicio para manejar la autenticación y generación de tokens JWT
/// </summary>
public class AuthService
{
    private const string JWT_SECRET_KEY = "SuperSecretKeyForJwtToken1234567890!@#";
    private const string USERNAME = "admin";
    private const string PASSWORD = "admin123";

    /// <summary>
    /// Valida las credenciales y genera un token JWT si son válidas
    /// </summary>
    public Task<LoginResponseDto?> AuthenticateAsync(LoginRequestDto loginRequest)
    {
        // Usuario y contraseña fijos
        if (loginRequest.Username != USERNAME || loginRequest.Password != PASSWORD)
            return Task.FromResult<LoginResponseDto?>(null);
        var token = GenerateJwtToken(USERNAME);
        var expiresAt = DateTime.UtcNow.AddHours(1);
        return Task.FromResult<LoginResponseDto?>(new LoginResponseDto
        {
            Token = token,
            ExpiresAt = expiresAt,
            Username = USERNAME
        });
    }

    private string GenerateJwtToken(string username)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(JWT_SECRET_KEY);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, username),
                new Claim(ClaimTypes.Role, "User"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            }),
            Expires = DateTime.UtcNow.AddHours(1),
            Issuer = "BinasCesarAPI",
            Audience = "BinasCesarUsers",
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature
            )
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
} 