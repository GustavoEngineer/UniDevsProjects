using BinasCesar.Application.Services;
using BinasCesar.Core.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BinasCesar.Presentation.Controllers;

/// <summary>
/// Controlador para manejar la autenticación
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    /// <summary>
    /// Autentica un usuario y devuelve un token JWT
    /// </summary>
    /// <param name="loginRequest">Credenciales de login</param>
    /// <returns>Token JWT si las credenciales son válidas</returns>
    /// <response code="200">Autenticación exitosa</response>
    /// <response code="401">Credenciales inválidas</response>
    [HttpPost("login")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(LoginResponseDto), 200)]
    [ProducesResponseType(401)]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto loginRequest)
    {
        if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Username) || string.IsNullOrEmpty(loginRequest.Password))
        {
            return BadRequest(new { message = "Username y Password son requeridos" });
        }
        var response = await _authService.AuthenticateAsync(loginRequest);
        if (response == null)
        {
            return Unauthorized(new { message = "Credenciales inválidas" });
        }
        return Ok(response);
    }
} 