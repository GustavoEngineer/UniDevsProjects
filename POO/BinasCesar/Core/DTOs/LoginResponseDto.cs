namespace BinasCesar.Core.DTOs;

/// <summary>
/// DTO para la respuesta de autenticación
/// </summary>
public class LoginResponseDto
{
    /// <summary>
    /// Token JWT generado
    /// </summary>
    public string Token { get; set; } = string.Empty;
    
    /// <summary>
    /// Fecha de expiración del token
    /// </summary>
    public DateTime ExpiresAt { get; set; }
    
    /// <summary>
    /// Nombre de usuario autenticado
    /// </summary>
    public string Username { get; set; } = string.Empty;
} 