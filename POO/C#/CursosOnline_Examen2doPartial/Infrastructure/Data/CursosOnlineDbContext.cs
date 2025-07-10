using CursosOnline.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace CursosOnline.Infrastructure.Data
{
    public class CursosOnlineDbContext : DbContext
    {
        public CursosOnlineDbContext(DbContextOptions<CursosOnlineDbContext> options) : base(options) { }

        public DbSet<Course> Courses { get; set; }
        public DbSet<Instructor> Instructors { get; set; }
        public DbSet<Module> Modules { get; set; }
        public DbSet<Lesson> Lessons { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Aquí puedes agregar configuraciones adicionales si lo necesitas
        }
    }
} 