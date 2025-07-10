using CursosOnline.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CursosOnline.Core.Interfaces
{
    public interface ILessonRepository
    {
        Task<Lesson?> GetByIdAsync(int lessonId);
        Task<IEnumerable<Lesson>> GetByModuleIdAsync(int moduleId);
        Task AddAsync(Lesson lesson);
        Task UpdateAsync(Lesson lesson);
        Task DeleteAsync(Lesson lesson);
    }
} 