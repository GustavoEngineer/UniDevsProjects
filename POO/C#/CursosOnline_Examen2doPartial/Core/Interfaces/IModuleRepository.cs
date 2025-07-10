using CursosOnline.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CursosOnline.Core.Interfaces
{
    public interface IModuleRepository
    {
        Task<Module?> GetByIdAsync(int moduleId);
        Task<IEnumerable<Module>> GetByCourseIdAsync(int courseId);
        Task AddAsync(Module module);
        Task UpdateAsync(Module module);
        Task DeleteAsync(Module module);
    }
} 