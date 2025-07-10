using CursosOnline.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CursosOnline.Core.Interfaces
{
    public interface IInstructorRepository
    {
        Task<Instructor?> GetByIdAsync(int instructorId);
        Task<IEnumerable<Instructor>> GetAllAsync(int page, int pageSize, string? filter = null);
        Task<int> GetTotalCountAsync(string? filter = null);
        Task AddAsync(Instructor instructor);
        Task UpdateAsync(Instructor instructor);
        Task DeleteAsync(Instructor instructor);
        Task<bool> ExistsWithNameAsync(string name);
        Task<bool> ExistsWithEmailAsync(string email);
        Task<bool> HasPublishedCoursesAsync(int instructorId);
    }
} 