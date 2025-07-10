using CursosOnline.Core.Entities;
using CursosOnline.Core.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using CursosOnline.Infrastructure.Data;

namespace CursosOnline.Infrastructure.Repositories
{
    public class ModuleRepository : IModuleRepository
    {
        private readonly CursosOnlineDbContext _context;

        public ModuleRepository(CursosOnlineDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Module module)
        {
            await _context.Modules.AddAsync(module);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteAsync(Module module)
        {
            _context.Modules.Remove(module);
            await _context.SaveChangesAsync();
        }
        public async Task<Module?> GetByIdAsync(int moduleId)
        {
            return await _context.Modules.FindAsync(moduleId);
        }
        public async Task UpdateAsync(Module module)
        {
            _context.Modules.Update(module);
            await _context.SaveChangesAsync();
        }
        public async Task<IEnumerable<Module>> GetByCourseIdAsync(int courseId)
        {
            return await _context.Modules.Where(m => m.CourseId == courseId).ToListAsync();
        }

        public async Task<int> GetTotalCountAsync(string? filter = null)
        {
            var query = _context.Modules.AsQueryable();
            if (!string.IsNullOrEmpty(filter))
            {
                query = query.Where(m => m.Title.Contains(filter));
            }
            return await query.CountAsync();
        }
    }
} 