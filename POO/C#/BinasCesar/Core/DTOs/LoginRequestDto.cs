namespace BinasCesar.Core.DTOs;

/// <summary>
/// DTO para la solicitud de autenticación
/// </summary>
public class LoginRequestDto
{
    /// <summary>
    /// Nombre de usuario
    /// </summary>
    public string Username { get; set; } = string.Empty;
    
    /// <summary>
    /// Contraseña del usuario
    /// </summary>
    public string Password { get; set; } = string.Empty;
} 