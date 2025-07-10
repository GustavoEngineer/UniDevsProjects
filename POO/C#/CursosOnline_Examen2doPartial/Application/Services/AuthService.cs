using CursosOnline.Core.DTOs;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CursosOnline.Application.Services
{
    public class AuthService
    {
        private readonly IConfiguration _config;

        public AuthService(IConfiguration config)
        {
            _config = config;
        }

        public async Task<AuthResponseDto> LoginAsync(LoginDto dto)
        {
            // Solo permite usuario admin/admin123
            if (dto.Username != "admin" || dto.Password != "admin123")
                throw new InvalidOperationException("Credenciales inválidas.");
            return await Task.FromResult(GenerateToken("admin", "admin", "admin"));
        }

        private AuthResponseDto GenerateToken(string name, string username, string role)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, name),
                new Claim("username", username),
                new Claim(ClaimTypes.Role, role)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"] ?? "supersecretkey123"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds
            );
            return new AuthResponseDto
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Name = name,
                Username = username,
                Role = role
            };
        }
    }
} 