using CursosOnline.Application.Services;
using CursosOnline.Core.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CursosOnline.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InstructorsController : ControllerBase
    {
        private readonly InstructorService _service;
        public InstructorsController(InstructorService service)
        {
            _service = service;
        }

        // GET: api/instructors?page=1&pageSize=10&filter=nombre
        [HttpGet]
        [Authorize(Roles = "admin,user")]
        public async Task<ActionResult<PagedResultDto<InstructorDto>>> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10, [FromQuery] string? filter = null)
        {
            return Ok(await _service.GetAllAsync(page, pageSize, filter));
        }

        // POST: api/instructors
        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<InstructorDto>> Create([FromBody] InstructorCreateUpdateDto dto)
        {
            var result = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetAll), new { id = result.instructor_id }, result);
        }

        // PUT: api/instructors/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<InstructorDto>> Update(int id, [FromBody] InstructorCreateUpdateDto dto)
        {
            return Ok(await _service.UpdateAsync(id, dto));
        }

        // DELETE: api/instructors/{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
} 