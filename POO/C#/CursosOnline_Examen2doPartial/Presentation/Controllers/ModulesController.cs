using CursosOnline.Application.Services;
using CursosOnline.Core.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CursosOnline.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ModulesController : ControllerBase
    {
        private readonly ModuleService _service;
        public ModulesController(ModuleService service)
        {
            _service = service;
        }

        // GET: api/modules/by-course/{courseId}
        [HttpGet("by-course/{courseId}")]
        [Authorize(Roles = "admin,user")]
        public async Task<ActionResult<IEnumerable<ModuleDto>>> GetByCourseId(int courseId)
        {
            return Ok(await _service.GetByCourseIdAsync(courseId));
        }

        // POST: api/modules
        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<ModuleDto>> Create([FromBody] ModuleCreateUpdateDto dto)
        {
            var result = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetByCourseId), new { courseId = result.course_id }, result);
        }

        // PUT: api/modules/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<ModuleDto>> Update(int id, [FromBody] ModuleCreateUpdateDto dto)
        {
            return Ok(await _service.UpdateAsync(id, dto));
        }

        // DELETE: api/modules/{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
} 