using CursosOnline.Core.DTOs;
using CursosOnline.Core.Entities;
using CursosOnline.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CursosOnline.Application.Services
{
    public class InstructorService
    {
        private readonly IInstructorRepository _instructorRepository;

        public InstructorService(IInstructorRepository instructorRepository)
        {
            _instructorRepository = instructorRepository;
        }

        public async Task<PagedResultDto<InstructorDto>> GetAllAsync(int page, int pageSize, string? filter = null)
        {
            var instructors = await _instructorRepository.GetAllAsync(page, pageSize, filter);
            var total = await _instructorRepository.GetTotalCountAsync(filter);
            var items = new List<InstructorDto>();
            foreach (var i in instructors)
            {
                items.Add(new InstructorDto { instructor_id = i.InstructorId, name = i.Name, email = i.Email });
            }
            return new PagedResultDto<InstructorDto>
            {
                TotalItems = total,
                TotalPages = (int)Math.Ceiling((double)total / pageSize),
                Page = page,
                PageSize = pageSize,
                Items = items
            };
        }

        public async Task<InstructorDto> CreateAsync(InstructorCreateUpdateDto dto)
        {
            // Regla: nombre único
            if (await _instructorRepository.ExistsWithNameAsync(dto.name))
                throw new InvalidOperationException("Ya existe un instructor con ese nombre.");
            if (await _instructorRepository.ExistsWithEmailAsync(dto.email))
                throw new InvalidOperationException("Ya existe un instructor con ese email.");
            var instructor = new Instructor { Name = dto.name, Email = dto.email };
            await _instructorRepository.AddAsync(instructor);
            return new InstructorDto { instructor_id = instructor.InstructorId, name = instructor.Name, email = instructor.Email };
        }

        public async Task<InstructorDto> UpdateAsync(int id, InstructorCreateUpdateDto dto)
        {
            var instructor = await _instructorRepository.GetByIdAsync(id) ?? throw new KeyNotFoundException("Instructor no encontrado.");
            if (instructor.Name != dto.name && await _instructorRepository.ExistsWithNameAsync(dto.name))
                throw new InvalidOperationException("Ya existe un instructor con ese nombre.");
            if (instructor.Email != dto.email && await _instructorRepository.ExistsWithEmailAsync(dto.email))
                throw new InvalidOperationException("Ya existe un instructor con ese email.");
            instructor.Name = dto.name;
            instructor.Email = dto.email;
            await _instructorRepository.UpdateAsync(instructor);
            return new InstructorDto { instructor_id = instructor.InstructorId, name = instructor.Name, email = instructor.Email };
        }

        public async Task DeleteAsync(int id)
        {
            var instructor = await _instructorRepository.GetByIdAsync(id) ?? throw new KeyNotFoundException("Instructor no encontrado.");
            // Regla: no eliminar si tiene cursos publicados
            if (await _instructorRepository.HasPublishedCoursesAsync(id))
                throw new InvalidOperationException("No se puede eliminar un instructor con cursos publicados.");
            await _instructorRepository.DeleteAsync(instructor);
        }
    }
} 