using Microsoft.AspNetCore.Mvc;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/cesar")]
    public class CesarController : ControllerBase
    {
        private readonly ICesarService _cesarService;

        public CesarController(ICesarService cesarService)
        {
            _cesarService = cesarService;
        }

        public class CesarRequest
        {
            public required string Mensaje { get; set; }
            public int Desplazamiento { get; set; }
        }

        [HttpPost("cifrar")]
        public IActionResult Cifrar([FromBody] CesarRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Mensaje))
                return BadRequest("Mensaje vacío");

            var resultado = _cesarService.Cifrar(request.Mensaje, request.Desplazamiento);
            return Ok(new { MensajeCifrado = resultado });
        }
    }
}
