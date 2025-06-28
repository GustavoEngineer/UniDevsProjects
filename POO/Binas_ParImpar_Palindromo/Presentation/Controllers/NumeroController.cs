using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProyectoBinas.Application.Services;
using ProyectoBinas.Core.DTOs;

namespace ProyectoBinas.Presentation.Controllers
{
    /// <summary>
    /// Controlador para manejar operaciones relacionadas con números pares e impares
    /// </summary>
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class NumeroController : ControllerBase
    {
        private readonly INumeroService _numeroService;

        /// <summary>
        /// Constructor del controlador de números
        /// </summary>
        /// <param name="numeroService">Servicio de números</param>
        public NumeroController(INumeroService numeroService)
        {
            _numeroService = numeroService;
        }

        /// <summary>
        /// Obtiene todos los números registrados
        /// </summary>
        /// <returns>Lista de todos los números</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<NumeroResponseDto>>> GetAll()
        {
            try
            {
                var numeros = await _numeroService.GetAllAsync();
                return Ok(numeros);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
            }
        }

        /// <summary>
        /// Obtiene un número por su ID
        /// </summary>
        /// <param name="id">ID del número</param>
        /// <returns>El número encontrado</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<NumeroResponseDto>> GetById(int id)
        {
            try
            {
                var numero = await _numeroService.GetByIdAsync(id);
                if (numero == null)
                    return NotFound(new { message = $"No se encontró el número con ID {id}" });

                return Ok(numero);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
            }
        }

        /// <summary>
        /// Crea un nuevo número
        /// </summary>
        /// <param name="createDto">Datos del número a crear</param>
        /// <returns>El número creado</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<NumeroResponseDto>> Create([FromBody] CreateNumeroDto createDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var numero = await _numeroService.CreateAsync(createDto);
                return CreatedAtAction(nameof(GetById), new { id = numero.Consulta_ID }, numero);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
            }
        }

        /// <summary>
        /// Actualiza un número existente
        /// </summary>
        /// <param name="id">ID del número a actualizar</param>
        /// <param name="updateDto">Nuevos datos del número</param>
        /// <returns>El número actualizado</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<NumeroResponseDto>> Update(int id, [FromBody] UpdateNumeroDto updateDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var numero = await _numeroService.UpdateAsync(id, updateDto);
                if (numero == null)
                    return NotFound(new { message = $"No se encontró el número con ID {id}" });

                return Ok(numero);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
            }
        }

        /// <summary>
        /// Elimina un número por su ID
        /// </summary>
        /// <param name="id">ID del número a eliminar</param>
        /// <returns>Confirmación de eliminación</returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var eliminado = await _numeroService.DeleteAsync(id);
                if (!eliminado)
                    return NotFound(new { message = $"No se encontró el número con ID {id}" });

                return Ok(new { message = $"Número con ID {id} eliminado correctamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
            }
        }

        /// <summary>
        /// Verifica si un número es par o impar (sin guardar en base de datos)
        /// </summary>
        /// <param name="valor">Número a verificar</param>
        /// <returns>Resultado de la verificación</returns>
        [AllowAnonymous]
        [HttpGet("verificar")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<object> VerificarParImpar([FromQuery] int valor)
        {
            // Validación genérica: solo enteros positivos
            if (valor <= 0)
                return BadRequest(new { message = "El número debe ser mayor a 0" });
            // Validación adicional: no permitir decimales ni caracteres especiales (ya lo controla el tipo int)
            // Si el parámetro no es convertible a int, el framework retorna 400 automáticamente
            bool esPar = valor % 2 == 0;
            return Ok(new { valor, esPar, esImpar = !esPar });
        }

        /// <summary>
        /// Obtiene una página de números registrados
        /// </summary>
        /// <param name="page">Número de página (1-based)</param>
        /// <param name="pageSize">Tamaño de página</param>
        /// <returns>Página de números</returns>
        [HttpGet("paginado")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<object>> GetPaged([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            try
            {
                var numeros = await _numeroService.GetPagedAsync(page, pageSize);
                var total = await _numeroService.GetTotalCountAsync();
                return Ok(new {
                    page,
                    pageSize,
                    total,
                    data = numeros
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
            }
        }
    }
} 