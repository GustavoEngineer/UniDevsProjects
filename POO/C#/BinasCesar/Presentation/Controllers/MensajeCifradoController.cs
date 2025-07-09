using BinasCesar.Application.Services;
using BinasCesar.Core.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BinasCesar.Presentation.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class MensajeCifradoController : ControllerBase
{
    private readonly CifradoCesarService _service;

    public MensajeCifradoController(CifradoCesarService service)
    {
        _service = service;
    }

    /// <summary>
    /// Obtiene la lista de todos los mensajes cifrados almacenados en la base de datos, paginada.
    /// </summary>
    /// <param name="pagina">Número de página a consultar (por defecto 1)</param>
    /// <param name="registrosPorPagina">Cantidad de registros por página (por defecto 10)</param>
    /// <returns>Respuesta paginada con los mensajes cifrados y metadatos de paginación</returns>
    [HttpGet]
    public async Task<ActionResult<PaginacionRespuestaDto<MensajeCifradoDto>>> ObtenerTodos([FromQuery] string pagina = "1", [FromQuery] string registrosPorPagina = "10")
    {
        if (!int.TryParse(pagina, out int paginaNum) || paginaNum < 1)
            return BadRequest("El parámetro 'pagina' debe ser un número entero positivo.");
        if (!int.TryParse(registrosPorPagina, out int registrosNum) || registrosNum < 1)
            return BadRequest("El parámetro 'registrosPorPagina' debe ser un número entero positivo.");
        var respuesta = await _service.ObtenerPaginadoAsync(paginaNum, registrosNum);
        return Ok(respuesta);
    }

    private static bool EsSoloLetras(string texto)
    {
        if (string.IsNullOrWhiteSpace(texto)) return false;
        // Permite letras (mayúsculas, minúsculas, acentos, ñ, Ñ) y espacios entre palabras
        return System.Text.RegularExpressions.Regex.IsMatch(texto, @"^[A-Za-zÁÉÍÓÚáéíóúÑñÜü ]+$");
    }

    /// <summary>
    /// Cifra un mensaje usando el método César y lo guarda en la base de datos junto con el desplazamiento utilizado.
    /// </summary>
    /// <param name="dto">Datos del mensaje original y desplazamiento</param>
    /// <returns>Mensaje cifrado creado</returns>
    /// <remarks>
    /// Ejemplo de body:
    /// {
    ///   "mensajeOriginal": "HOLA MUNDO",
    ///   "desplazamiento": 3
    /// }
    /// </remarks>
    [HttpPost]
    public async Task<ActionResult<MensajeCifradoDto>> Crear([FromBody] CrearMensajeDto dto)
    {
        if (dto == null)
            return BadRequest("El cuerpo de la solicitud no puede estar vacío.");
        if (string.IsNullOrWhiteSpace(dto.MensajeOriginal))
            return BadRequest("El mensaje original no puede estar vacío.");
        if (!EsSoloLetras(dto.MensajeOriginal))
            return BadRequest("El mensaje original solo puede contener letras (con o sin acento, mayúsculas/minúsculas) y espacios entre palabras.");
        if (dto.Desplazamiento.ToString().Any(c => !char.IsDigit(c)))
            return BadRequest("El desplazamiento solo puede contener números enteros positivos.");
        if (dto.Desplazamiento < 0 || dto.Desplazamiento > 25)
            return BadRequest("El desplazamiento debe estar entre 0 y 25.");
        try
        {
            var mensajeCreado = await _service.CrearMensajeCifradoAsync(dto);
            return CreatedAtAction(nameof(ObtenerPorId), new { id = mensajeCreado.IdCifrado }, mensajeCreado);
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { message = ex.Message });
        }
    }

    /// <summary>
    /// Obtiene un mensaje cifrado específico por su identificador único (id).
    /// </summary>
    /// <param name="id">Identificador del mensaje cifrado</param>
    /// <returns>Mensaje cifrado encontrado</returns>
    [HttpGet("{id}")]
    public async Task<ActionResult<MensajeCifradoDto>> ObtenerPorId(string id)
    {
        if (!int.TryParse(id, out int idNum) || idNum < 1)
            return BadRequest("El parámetro 'id' debe ser un número entero positivo.");
        var mensaje = await _service.ObtenerPorIdAsync(idNum);
        if (mensaje == null)
            return NotFound($"No se encontró el mensaje con ID {idNum}");
        return Ok(mensaje);
    }

    /// <summary>
    /// Obtiene un mensaje cifrado específico por su identificador único (id) y muestra tanto el mensaje cifrado como el descifrado.
    /// </summary>
    /// <param name="id">Identificador del mensaje cifrado</param>
    /// <returns>Mensaje cifrado y descifrado encontrado</returns>
    [HttpGet("{id}/completo")]
    public async Task<ActionResult<MensajeCompletoDto>> ObtenerMensajeCompleto(string id)
    {
        if (!int.TryParse(id, out int idNum) || idNum < 1)
            return BadRequest("El parámetro 'id' debe ser un número entero positivo.");
        var mensaje = await _service.ObtenerMensajeCompletoAsync(idNum);
        if (mensaje == null)
            return NotFound($"No se encontró el mensaje con ID {idNum}");
        return Ok(mensaje);
    }

    /// <summary>
    /// Actualiza un mensaje cifrado existente, permitiendo cambiar el mensaje original y el desplazamiento. El mensaje se vuelve a cifrar con los nuevos datos.
    /// </summary>
    /// <param name="id">Identificador del mensaje cifrado</param>
    /// <param name="dto">Nuevos datos del mensaje original y desplazamiento</param>
    /// <returns>Mensaje cifrado actualizado</returns>
    /// <remarks>
    /// Ejemplo de body:
    /// {
    ///   "mensajeOriginal": "NUEVO MENSAJE",
    ///   "desplazamiento": 5
    /// }
    /// </remarks>
    [HttpPut("{id}")]
    public async Task<ActionResult<MensajeCifradoDto>> Actualizar(string id, [FromBody] ActualizarMensajeDto dto)
    {
        if (!int.TryParse(id, out int idNum) || idNum < 1)
            return BadRequest("El parámetro 'id' debe ser un número entero positivo.");
        if (dto == null)
            return BadRequest("El cuerpo de la solicitud no puede estar vacío.");
        if (string.IsNullOrWhiteSpace(dto.MensajeOriginal))
            return BadRequest("El mensaje original no puede estar vacío.");
        if (!EsSoloLetras(dto.MensajeOriginal))
            return BadRequest("El mensaje original solo puede contener letras (con o sin acento, mayúsculas/minúsculas) y espacios entre palabras.");
        if (dto.Desplazamiento.ToString().Any(c => !char.IsDigit(c)))
            return BadRequest("El desplazamiento solo puede contener números enteros positivos.");
        if (dto.Desplazamiento < 0 || dto.Desplazamiento > 25)
            return BadRequest("El desplazamiento debe estar entre 0 y 25.");
        var mensajeActualizado = await _service.ActualizarAsync(idNum, dto);
        if (mensajeActualizado == null)
            return NotFound($"No se encontró el mensaje con ID {idNum}");
        return Ok(mensajeActualizado);
    }

    /// <summary>
    /// Elimina un mensaje cifrado de la base de datos usando su identificador único (id).
    /// </summary>
    /// <param name="id">Identificador del mensaje cifrado</param>
    /// <returns>Sin contenido si se elimina correctamente</returns>
    [HttpDelete("{id}")]
    public async Task<ActionResult> Eliminar(string id)
    {
        if (!int.TryParse(id, out int idNum) || idNum < 1)
            return BadRequest("El parámetro 'id' debe ser un número entero positivo.");
        var eliminado = await _service.EliminarAsync(idNum);
        if (!eliminado)
            return NotFound($"No se encontró el mensaje con ID {idNum}");
        return NoContent();
    }

    /// <summary>
    /// Cifra un mensaje usando el método César sin guardarlo en la base de datos. Solo devuelve el resultado del cifrado.
    /// </summary>
    /// <param name="dto">Datos del mensaje original y desplazamiento</param>
    /// <returns>Mensaje cifrado</returns>
    /// <remarks>
    /// Ejemplo de body:
    /// {
    ///   "mensajeOriginal": "PROGRAMACION",
    ///   "desplazamiento": 7
    /// }
    /// </remarks>
    [HttpPost("cifrar")]
    public ActionResult<string> CifrarMensaje([FromBody] CrearMensajeDto dto)
    {
        if (dto == null)
            return BadRequest("El cuerpo de la solicitud no puede estar vacío.");
        if (string.IsNullOrWhiteSpace(dto.MensajeOriginal))
            return BadRequest("El mensaje original no puede estar vacío.");
        if (!EsSoloLetras(dto.MensajeOriginal))
            return BadRequest("El mensaje original solo puede contener letras (con o sin acento, mayúsculas/minúsculas) y espacios entre palabras.");
        if (dto.Desplazamiento.ToString().Any(c => !char.IsDigit(c)))
            return BadRequest("El desplazamiento solo puede contener números enteros positivos.");
        if (dto.Desplazamiento < 0 || dto.Desplazamiento > 25)
            return BadRequest("El desplazamiento debe estar entre 0 y 25.");
        var mensajeCifrado = _service.CifrarMensaje(dto.MensajeOriginal, dto.Desplazamiento);
        return Ok(new { mensajeOriginal = dto.MensajeOriginal, mensajeCifrado, desplazamiento = dto.Desplazamiento });
    }

    /// <summary>
    /// Descifra un mensaje cifrado usando el método César y el desplazamiento proporcionado. No guarda nada en la base de datos, solo devuelve el mensaje descifrado.
    /// </summary>
    /// <param name="dto">Datos del mensaje cifrado y desplazamiento</param>
    /// <returns>Mensaje descifrado</returns>
    /// <remarks>
    /// Ejemplo de body:
    /// {
    ///   "mensajeOriginal": "WYVNYHTHJPW",
    ///   "desplazamiento": 7
    /// }
    /// </remarks>
    [HttpPost("descifrar")]
    public ActionResult<string> DescifrarMensaje([FromBody] CrearMensajeDto dto)
    {
        if (dto == null)
            return BadRequest("El cuerpo de la solicitud no puede estar vacío.");
        if (string.IsNullOrWhiteSpace(dto.MensajeOriginal))
            return BadRequest("El mensaje cifrado no puede estar vacío.");
        if (!EsSoloLetras(dto.MensajeOriginal))
            return BadRequest("El mensaje cifrado solo puede contener letras (con o sin acento, mayúsculas/minúsculas) y espacios entre palabras.");
        if (dto.Desplazamiento.ToString().Any(c => !char.IsDigit(c)))
            return BadRequest("El desplazamiento solo puede contener números enteros positivos.");
        if (dto.Desplazamiento < 0 || dto.Desplazamiento > 25)
            return BadRequest("El desplazamiento debe estar entre 0 y 25.");
        var mensajeDescifrado = _service.DescifrarMensaje(dto.MensajeOriginal, dto.Desplazamiento);
        return Ok(new { mensajeCifrado = dto.MensajeOriginal, mensajeDescifrado, desplazamiento = dto.Desplazamiento });
    }

    /// <summary>
    /// Guarda un mensaje ya cifrado en la base de datos junto con el desplazamiento utilizado.
    /// </summary>
    /// <param name="dto">Datos del mensaje cifrado y desplazamiento</param>
    /// <returns>Mensaje cifrado guardado</returns>
    /// <remarks>
    /// Ejemplo de body:
    /// {
    ///   "mensajeCifrado": "KROD PXQGR",
    ///   "desplazamiento": 3
    /// }
    /// </remarks>
    [HttpPost("guardar-cifrado")]
    public async Task<ActionResult<MensajeCifradoDto>> GuardarCifrado([FromBody] GuardarMensajeCifradoDto dto)
    {
        if (dto == null)
            return BadRequest("El cuerpo de la solicitud no puede estar vacío.");
        if (string.IsNullOrWhiteSpace(dto.MensajeCifrado))
            return BadRequest("El mensaje cifrado no puede estar vacío.");
        if (!System.Text.RegularExpressions.Regex.IsMatch(dto.MensajeCifrado, @"^[A-Za-zÁÉÍÓÚáéíóúÑñÜü ]+$"))
            return BadRequest("El mensaje cifrado solo puede contener letras (con o sin acento, mayúsculas/minúsculas) y espacios entre palabras.");
        if (dto.Desplazamiento < 0 || dto.Desplazamiento > 25)
            return BadRequest("El desplazamiento debe ser un número entero positivo entre 0 y 25.");
        try
        {
            var mensajeGuardado = await _service.GuardarMensajeCifradoAsync(dto);
            return CreatedAtAction(nameof(ObtenerPorId), new { id = mensajeGuardado.IdCifrado }, mensajeGuardado);
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { message = ex.Message });
        }
    }
} 