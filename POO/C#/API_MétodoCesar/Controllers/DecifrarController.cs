using Microsoft.AspNetCore.Mvc;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/descifrar")]
    public class DescifrarController : ControllerBase
    {
        private readonly IDescifrarCesarService _descifrarService;

        public DescifrarController(IDescifrarCesarService descifrarService)
        {
            _descifrarService = descifrarService;
        }

        public class DescifrarRequest
        {
            public required string Mensaje { get; set; }
            public int Desplazamiento { get; set; }
        }

        [HttpPost]
        public IActionResult Descifrar([FromBody] DescifrarRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Mensaje))
                return BadRequest("Mensaje vacío");

            var resultado = _descifrarService.Descifrar(request.Mensaje, request.Desplazamiento);
            return Ok(new { MensajeDescifrado = resultado });
        }
    }
}
