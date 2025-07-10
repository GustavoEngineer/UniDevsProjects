using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CursosOnline.Core.Entities
{
    /// <summary>
    /// Instructor de la plataforma. El nombre debe ser único.
    /// </summary>
    public class Instructor
    {
        [Key]
        [Column("instructor_id")]
        public int InstructorId { get; set; }

        [Required]
        [StringLength(100)]
        [Column("name")]
        public string Name { get; set; } = null!; // Regla: ÚNICO

        [Required]
        [EmailAddress]
        [StringLength(150)]
        [Column("email")]
        public string Email { get; set; } = null!; // Puede ser único

        // Relación: Un instructor puede tener muchos cursos
        public ICollection<Course> Courses { get; set; } = new List<Course>();
    }
} 