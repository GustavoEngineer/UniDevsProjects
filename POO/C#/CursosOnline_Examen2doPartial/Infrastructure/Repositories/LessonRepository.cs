using CursosOnline.Core.Entities;
using CursosOnline.Core.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using CursosOnline.Infrastructure.Data;

namespace CursosOnline.Infrastructure.Repositories
{
    public class LessonRepository : ILessonRepository
    {
        private readonly CursosOnlineDbContext _context;

        public LessonRepository(CursosOnlineDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Lesson lesson)
        {
            await _context.Lessons.AddAsync(lesson);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteAsync(Lesson lesson)
        {
            _context.Lessons.Remove(lesson);
            await _context.SaveChangesAsync();
        }
        public async Task<Lesson?> GetByIdAsync(int lessonId)
        {
            return await _context.Lessons.FindAsync(lessonId);
        }
        public async Task UpdateAsync(Lesson lesson)
        {
            _context.Lessons.Update(lesson);
            await _context.SaveChangesAsync();
        }
        public async Task<IEnumerable<Lesson>> GetByModuleIdAsync(int moduleId)
        {
            return await _context.Lessons.Where(l => l.ModuleId == moduleId).ToListAsync();
        }

        public async Task<int> GetTotalCountAsync(string? filter = null)
        {
            var query = _context.Lessons.AsQueryable();
            if (!string.IsNullOrEmpty(filter))
            {
                query = query.Where(l => l.Title.Contains(filter));
            }
            return await query.CountAsync();
        }
    }
} 