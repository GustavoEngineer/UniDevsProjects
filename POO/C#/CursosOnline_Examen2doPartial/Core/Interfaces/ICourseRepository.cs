using CursosOnline.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CursosOnline.Core.Interfaces
{
    public interface ICourseRepository
    {
        Task<Course?> GetByIdAsync(int courseId);
        Task<IEnumerable<Course>> GetAllAsync(int page, int pageSize, string? filter = null);
        Task<int> GetTotalCountAsync(string? filter = null);
        Task AddAsync(Course course);
        Task UpdateAsync(Course course);
        Task DeleteAsync(Course course);
        Task<bool> IsCoursePublishedAsync(int courseId);
        Task<bool> ExistsWithTitleAsync(string title);
    }
} 