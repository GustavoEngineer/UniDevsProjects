using CursosOnline.Core.Entities;
using CursosOnline.Core.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using CursosOnline.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CursosOnline.Infrastructure.Repositories
{
    public class InstructorRepository : IInstructorRepository
    {
        private readonly CursosOnlineDbContext _context;
        public InstructorRepository(CursosOnlineDbContext context)
        {
            _context = context;
        }
        public async Task AddAsync(Instructor instructor)
        {
            await _context.Instructors.AddAsync(instructor);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteAsync(Instructor instructor)
        {
            _context.Instructors.Remove(instructor);
            await _context.SaveChangesAsync();
        }
        public async Task<bool> ExistsWithEmailAsync(string email)
        {
            return await _context.Instructors.AnyAsync(i => i.Email == email);
        }
        public async Task<bool> ExistsWithNameAsync(string name)
        {
            return await _context.Instructors.AnyAsync(i => i.Name == name);
        }
        public async Task<Instructor?> GetByIdAsync(int instructorId)
        {
            return await _context.Instructors.FindAsync(instructorId);
        }
        public async Task<bool> HasPublishedCoursesAsync(int instructorId)
        {
            return await _context.Courses.AnyAsync(c => c.InstructorId == instructorId && c.IsPublished);
        }
        public async Task UpdateAsync(Instructor instructor)
        {
            _context.Instructors.Update(instructor);
            await _context.SaveChangesAsync();
        }
        public async Task<IEnumerable<Instructor>> GetAllAsync(int page, int pageSize, string? filter = null)
        {
            var query = _context.Instructors.AsQueryable();

            if (!string.IsNullOrEmpty(filter))
            {
                query = query.Where(i => i.Name.Contains(filter));
            }

            return await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }
        public async Task<int> GetTotalCountAsync(string? filter = null)
        {
            var query = _context.Instructors.AsQueryable();
            if (!string.IsNullOrEmpty(filter))
            {
                query = query.Where(i => i.Name.Contains(filter));
            }
            return await query.CountAsync();
        }
    }
} 