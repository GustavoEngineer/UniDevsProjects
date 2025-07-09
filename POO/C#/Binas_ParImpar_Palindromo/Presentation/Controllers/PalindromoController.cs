using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ProyectoBinas.Core.Entities;
using ProyectoBinas.Core.DTOs;
using ProyectoBinas.Application.Services;

namespace ProyectoBinas.Presentation.Controllers
{
    /// <summary>
    /// Controlador para gestionar las operaciones de palíndromos
    /// </summary>
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class PalindromosController : ControllerBase
    {
        private readonly PalindromoService _palindromoService;

        /// <summary>
        /// Constructor del controlador de palíndromos
        /// </summary>
        /// <param name="palindromoService">Servicio de palíndromos</param>
        public PalindromosController(PalindromoService palindromoService)
        {
            _palindromoService = palindromoService;
        }

        /// <summary>
        /// Obtiene los palíndromos paginados
        /// </summary>
        /// <param name="pageNumber">Número de página (opcional, por defecto 1)</param>
        /// <param name="pageSize">Tamaño de página (opcional, por defecto 10)</param>
        /// <returns>Lista paginada de palíndromos y metadatos</returns>
        /// <response code="200">Devuelve la lista paginada de palíndromos</response>
        [HttpGet]
        [ProducesResponseType(typeof(PagedPalindromoResponseDto), 200)]
        public async Task<IActionResult> GetAllPalindromos([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var pagedResult = await _palindromoService.GetPagedPalindromosAsync(pageNumber, pageSize);
            return Ok(pagedResult);
        }

        /// <summary>
        /// Obtiene un palíndromo por su ID
        /// </summary>
        /// <param name="id">ID del palíndromo</param>
        /// <returns>El palíndromo solicitado</returns>
        /// <response code="200">Devuelve el palíndromo solicitado</response>
        /// <response code="404">Si el palíndromo no se encuentra</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(PalindromoResponseDto), 200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetPalindromoById(int id)
        {
            var palindromo = await _palindromoService.GetPalindromoByIdAsync(id);
            if (palindromo == null)
            {
                return NotFound(new { message = $"Palíndromo con ID {id} no encontrado" });
            }

            var palindromoDto = new PalindromoResponseDto
            {
                Palindromo_ID = palindromo.Palindromo_ID,
                Palabra = palindromo.Palabra,
                EsPalindromo = palindromo.EsPalindromo,
                FechaConsulta = palindromo.FechaConsulta
            };

            return Ok(palindromoDto);
        }

        /// <summary>
        /// Crea un nuevo palíndromo
        /// </summary>
        /// <param name="createPalindromoDto">Datos del palíndromo a crear</param>
        /// <returns>El palíndromo creado</returns>
        /// <response code="201">Palíndromo creado exitosamente</response>
        /// <response code="400">Si los datos de entrada son inválidos</response>
        [HttpPost]
        [ProducesResponseType(typeof(PalindromoResponseDto), 201)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> AddPalindromo([FromBody] CreatePalindromoDto createPalindromoDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Validación: solo letras y espacios entre palabras
            if (!System.Text.RegularExpressions.Regex.IsMatch(createPalindromoDto.Palabra, "^([a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*)$"))
            {
                return BadRequest(new { message = "La palabra solo puede contener letras y espacios entre palabras (sin números ni caracteres especiales)" });
            }

            var palindromo = new Palindromo
            {
                Palabra = createPalindromoDto.Palabra
            };

            await _palindromoService.AddPalindromoAsync(palindromo);

            var palindromoDto = new PalindromoResponseDto
            {
                Palindromo_ID = palindromo.Palindromo_ID,
                Palabra = palindromo.Palabra,
                EsPalindromo = palindromo.EsPalindromo,
                FechaConsulta = palindromo.FechaConsulta
            };

            return CreatedAtAction(nameof(GetPalindromoById), new { id = palindromo.Palindromo_ID }, palindromoDto);
        }

        /// <summary>
        /// Actualiza un palíndromo existente
        /// </summary>
        /// <param name="id">ID del palíndromo a actualizar</param>
        /// <param name="updatePalindromoDto">Nuevos datos del palíndromo</param>
        /// <returns>Resultado de la operación</returns>
        /// <response code="204">Palíndromo actualizado exitosamente</response>
        /// <response code="400">Si los datos de entrada son inválidos</response>
        /// <response code="404">Si el palíndromo no se encuentra</response>
        [HttpPut("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> UpdatePalindromo(int id, [FromBody] UpdatePalindromoDto updatePalindromoDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingPalindromo = await _palindromoService.GetPalindromoByIdAsync(id);
            if (existingPalindromo == null)
            {
                return NotFound(new { message = $"Palíndromo con ID {id} no encontrado" });
            }

            existingPalindromo.Palabra = updatePalindromoDto.Palabra;

            await _palindromoService.UpdatePalindromoAsync(existingPalindromo);
            return NoContent();
        }

        /// <summary>
        /// Elimina un palíndromo
        /// </summary>
        /// <param name="id">ID del palíndromo a eliminar</param>
        /// <returns>Resultado de la operación</returns>
        /// <response code="204">Palíndromo eliminado exitosamente</response>
        /// <response code="404">Si el palíndromo no se encuentra</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeletePalindromo(int id)
        {
            var existingPalindromo = await _palindromoService.GetPalindromoByIdAsync(id);
            if (existingPalindromo == null)
            {
                return NotFound(new { message = $"Palíndromo con ID {id} no encontrado" });
            }

            await _palindromoService.DeletePalindromoAsync(id);
            return NoContent();
        }

        /// <summary>
        /// Verifica si una palabra es palíndromo sin guardar en base de datos
        /// </summary>
        /// <param name="palabra">Palabra a verificar</param>
        /// <returns>Resultado de la verificación</returns>
        /// <response code="200">Devuelve el resultado de la verificación</response>
        [HttpGet("verificar/{palabra}")]
        [ProducesResponseType(typeof(VerificacionPalindromoDto), 200)]
        public IActionResult VerificarPalindromo(string palabra)
        {
            if (string.IsNullOrWhiteSpace(palabra))
            {
                return BadRequest(new { message = "La palabra es obligatoria" });
            }
            // Validación genérica: solo letras (mayúsculas, minúsculas, acentuadas y ñ)
            if (!System.Text.RegularExpressions.Regex.IsMatch(palabra, "^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$"))
            {
                return BadRequest(new { message = "La palabra solo puede contener letras" });
            }
            bool esPalindromo = _palindromoService.VerificarPalindromo(palabra);
            var verificacionDto = new VerificacionPalindromoDto
            {
                Palabra = palabra,
                EsPalindromo = esPalindromo,
                FechaVerificacion = DateTime.Now
            };
            return Ok(verificacionDto);
        }
    }
} 