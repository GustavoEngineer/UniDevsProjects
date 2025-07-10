using CursosOnline.Core.DTOs;
using CursosOnline.Core.Entities;
using CursosOnline.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CursosOnline.Application.Services
{
    public class CourseService
    {
        private readonly ICourseRepository _courseRepository;
        private readonly IInstructorRepository _instructorRepository;

        public CourseService(ICourseRepository courseRepository, IInstructorRepository instructorRepository)
        {
            _courseRepository = courseRepository;
            _instructorRepository = instructorRepository;
        }

        public async Task<PagedResultDto<CourseDto>> GetAllAsync(int page, int pageSize, string? filter = null)
        {
            var courses = await _courseRepository.GetAllAsync(page, pageSize, filter);
            var total = await _courseRepository.GetTotalCountAsync(filter);
            var items = new List<CourseDto>();
            foreach (var c in courses)
            {
                items.Add(new CourseDto
                {
                    course_id = c.CourseId,
                    title = c.Title,
                    description = c.Description,
                    instructor_id = c.InstructorId,
                    is_published = c.IsPublished,
                    published_date = c.PublishedDate
                });
            }
            return new PagedResultDto<CourseDto>
            {
                TotalItems = total,
                TotalPages = (int)Math.Ceiling((double)total / pageSize),
                Page = page,
                PageSize = pageSize,
                Items = items
            };
        }

        public async Task<CourseDto> CreateAsync(CourseCreateUpdateDto dto)
        {
            var instructor = await _instructorRepository.GetByIdAsync(dto.instructor_id) ?? throw new KeyNotFoundException("Instructor no encontrado.");
            var course = new Course
            {
                Title = dto.title,
                Description = dto.description,
                InstructorId = dto.instructor_id,
                Instructor = instructor
            };
            await _courseRepository.AddAsync(course);
            return new CourseDto
            {
                course_id = course.CourseId,
                title = course.Title,
                description = course.Description,
                instructor_id = course.InstructorId,
                is_published = course.IsPublished,
                published_date = course.PublishedDate
            };
        }

        public async Task<CourseDto> UpdateAsync(int id, CourseCreateUpdateDto dto)
        {
            var course = await _courseRepository.GetByIdAsync(id) ?? throw new KeyNotFoundException("Curso no encontrado.");
            if (course.IsPublished)
                throw new InvalidOperationException("No se puede modificar un curso publicado.");
            course.Title = dto.title;
            course.Description = dto.description;
            course.InstructorId = dto.instructor_id;
            await _courseRepository.UpdateAsync(course);
            return new CourseDto
            {
                course_id = course.CourseId,
                title = course.Title,
                description = course.Description,
                instructor_id = course.InstructorId,
                is_published = course.IsPublished,
                published_date = course.PublishedDate
            };
        }

        public async Task DeleteAsync(int id)
        {
            var course = await _courseRepository.GetByIdAsync(id) ?? throw new KeyNotFoundException("Curso no encontrado.");
            if (course.IsPublished)
                throw new InvalidOperationException("No se puede eliminar un curso publicado.");
            await _courseRepository.DeleteAsync(course);
        }

        public async Task<CourseDto> PublishAsync(int id)
        {
            var course = await _courseRepository.GetByIdAsync(id) ?? throw new KeyNotFoundException("Curso no encontrado.");
            if (course.IsPublished)
                throw new InvalidOperationException("El curso ya está publicado.");
            course.IsPublished = true;
            course.PublishedDate = DateTime.UtcNow;
            await _courseRepository.UpdateAsync(course);
            return new CourseDto
            {
                course_id = course.CourseId,
                title = course.Title,
                description = course.Description,
                instructor_id = course.InstructorId,
                is_published = course.IsPublished,
                published_date = course.PublishedDate
            };
        }
    }
} 