using CursosOnline.Core.Entities;
using CursosOnline.Core.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using CursosOnline.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CursosOnline.Infrastructure.Repositories
{
    public class CourseRepository : ICourseRepository
    {
        private readonly CursosOnlineDbContext _context;
        public CourseRepository(CursosOnlineDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Course course)
        {
            await _context.Courses.AddAsync(course);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteAsync(Course course)
        {
            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();
        }
        public async Task<bool> ExistsWithTitleAsync(string title)
        {
            return await _context.Courses.AnyAsync(c => c.Title == title);
        }
        public async Task<bool> IsCoursePublishedAsync(int courseId)
        {
            var course = await _context.Courses.FindAsync(courseId);
            return course != null && course.IsPublished;
        }
        public async Task UpdateAsync(Course course)
        {
            _context.Courses.Update(course);
            await _context.SaveChangesAsync();
        }
        public async Task<IEnumerable<Course>> GetAllAsync(int page, int pageSize, string? filter = null)
        {
            var query = _context.Courses.AsQueryable();

            if (!string.IsNullOrEmpty(filter))
            {
                query = query.Where(c => c.Title.Contains(filter));
            }

            return await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }
        public async Task<Course?> GetByIdAsync(int courseId)
        {
            return await _context.Courses.FindAsync(courseId);
        }
        public async Task<int> GetTotalCountAsync(string? filter = null)
        {
            var query = _context.Courses.AsQueryable();
            if (!string.IsNullOrEmpty(filter))
            {
                query = query.Where(c => c.Title.Contains(filter));
            }
            return await query.CountAsync();
        }
    }
} 