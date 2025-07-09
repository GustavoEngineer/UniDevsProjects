using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ProyectoBinas.Presentation.Controllers
{
    /// <summary>
    /// Controlador para autenticación y generación de tokens JWT.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly string _jwtSecretKey = "SuperSecretKeyForJwtToken1234567890!@#";

        /// <summary>
        /// Realiza el login y devuelve un token JWT si las credenciales son correctas.
        /// </summary>
        /// <param name="request">Credenciales de acceso</param>
        /// <returns>Token JWT válido por 1 hora</returns>
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // Usuario y contraseña fijos
            if (request.Username != "admin" || request.Password != "admin123")
                return Unauthorized(new { message = "Credenciales inválidas" });

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSecretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, request.Username)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new { token = tokenString });
        }
    }

    /// <summary>
    /// Modelo para la solicitud de login.
    /// </summary>
    public class LoginRequest
    {
        /// <summary>
        /// Nombre de usuario.
        /// </summary>
        public string Username { get; set; } = string.Empty;
        /// <summary>
        /// Contraseña del usuario.
        /// </summary>
        public string Password { get; set; } = string.Empty;
    }
} 