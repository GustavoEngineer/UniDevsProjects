using CursosOnline.Application.Services;
using CursosOnline.Core.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CursosOnline.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LessonsController : ControllerBase
    {
        private readonly LessonService _service;
        public LessonsController(LessonService service)
        {
            _service = service;
        }

        // GET: api/lessons/by-module/{moduleId}
        [HttpGet("by-module/{moduleId}")]
        [Authorize(Roles = "admin,user")]
        public async Task<ActionResult<IEnumerable<LessonDto>>> GetByModuleId(int moduleId)
        {
            return Ok(await _service.GetByModuleIdAsync(moduleId));
        }

        // POST: api/lessons
        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<LessonDto>> Create([FromBody] LessonCreateUpdateDto dto)
        {
            var result = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetByModuleId), new { moduleId = result.module_id }, result);
        }

        // PUT: api/lessons/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<LessonDto>> Update(int id, [FromBody] LessonCreateUpdateDto dto)
        {
            return Ok(await _service.UpdateAsync(id, dto));
        }

        // DELETE: api/lessons/{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
} 