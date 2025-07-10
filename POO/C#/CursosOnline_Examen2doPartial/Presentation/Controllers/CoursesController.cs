using CursosOnline.Application.Services;
using CursosOnline.Core.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CursosOnline.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CoursesController : ControllerBase
    {
        private readonly CourseService _service;
        public CoursesController(CourseService service)
        {
            _service = service;
        }

        // GET: api/courses?page=1&pageSize=10&filter=nombre
        [HttpGet]
        [Authorize(Roles = "admin,user")]
        public async Task<ActionResult<PagedResultDto<CourseDto>>> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10, [FromQuery] string? filter = null)
        {
            return Ok(await _service.GetAllAsync(page, pageSize, filter));
        }

        // POST: api/courses
        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<CourseDto>> Create([FromBody] CourseCreateUpdateDto dto)
        {
            var result = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetAll), new { id = result.course_id }, result);
        }

        // PUT: api/courses/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<CourseDto>> Update(int id, [FromBody] CourseCreateUpdateDto dto)
        {
            return Ok(await _service.UpdateAsync(id, dto));
        }

        // DELETE: api/courses/{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }

        // POST: api/courses/{id}/publish
        [HttpPost("{id}/publish")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<CourseDto>> Publish(int id)
        {
            return Ok(await _service.PublishAsync(id));
        }
    }
} 