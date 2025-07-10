using CursosOnline.Core.DTOs;
using CursosOnline.Core.Entities;
using CursosOnline.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CursosOnline.Application.Services
{
    public class ModuleService
    {
        private readonly IModuleRepository _moduleRepository;
        private readonly ICourseRepository _courseRepository;

        public ModuleService(IModuleRepository moduleRepository, ICourseRepository courseRepository)
        {
            _moduleRepository = moduleRepository;
            _courseRepository = courseRepository;
        }

        public async Task<IEnumerable<ModuleDto>> GetByCourseIdAsync(int courseId)
        {
            var modules = await _moduleRepository.GetByCourseIdAsync(courseId);
            var items = new List<ModuleDto>();
            foreach (var m in modules)
            {
                items.Add(new ModuleDto
                {
                    module_id = m.ModuleId,
                    course_id = m.CourseId,
                    title = m.Title,
                    description = m.Description,
                    order_in_course = m.OrderInCourse
                });
            }
            return items;
        }

        public async Task<ModuleDto> CreateAsync(ModuleCreateUpdateDto dto)
        {
            // Regla: no modificar si el curso está publicado
            if (await _courseRepository.IsCoursePublishedAsync(dto.course_id))
                throw new InvalidOperationException("No se puede agregar un módulo a un curso publicado.");
            var module = new Module
            {
                CourseId = dto.course_id,
                Title = dto.title,
                Description = dto.description,
                OrderInCourse = dto.order_in_course
            };
            await _moduleRepository.AddAsync(module);
            return new ModuleDto
            {
                module_id = module.ModuleId,
                course_id = module.CourseId,
                title = module.Title,
                description = module.Description,
                order_in_course = module.OrderInCourse
            };
        }

        public async Task<ModuleDto> UpdateAsync(int id, ModuleCreateUpdateDto dto)
        {
            var module = await _moduleRepository.GetByIdAsync(id) ?? throw new KeyNotFoundException("Módulo no encontrado.");
            // Regla: no modificar si el curso está publicado
            if (await _courseRepository.IsCoursePublishedAsync(module.CourseId))
                throw new InvalidOperationException("No se puede modificar un módulo de un curso publicado.");
            module.Title = dto.title;
            module.Description = dto.description;
            module.OrderInCourse = dto.order_in_course;
            await _moduleRepository.UpdateAsync(module);
            return new ModuleDto
            {
                module_id = module.ModuleId,
                course_id = module.CourseId,
                title = module.Title,
                description = module.Description,
                order_in_course = module.OrderInCourse
            };
        }

        public async Task DeleteAsync(int id)
        {
            var module = await _moduleRepository.GetByIdAsync(id) ?? throw new KeyNotFoundException("Módulo no encontrado.");
            // Regla: no eliminar si el curso está publicado
            if (await _courseRepository.IsCoursePublishedAsync(module.CourseId))
                throw new InvalidOperationException("No se puede eliminar un módulo de un curso publicado.");
            await _moduleRepository.DeleteAsync(module);
        }
    }
} 