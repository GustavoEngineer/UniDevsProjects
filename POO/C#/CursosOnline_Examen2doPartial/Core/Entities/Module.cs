using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CursosOnline.Core.Entities
{
    /// <summary>
    /// Módulo de un curso. Pertenece a un curso y contiene lecciones.
    /// </summary>
    public class Module
    {
        [Key]
        [Column("module_id")]
        public int ModuleId { get; set; }

        // Relación: Un módulo pertenece a un curso
        [Column("course_id")]
        public int CourseId { get; set; }
        public Course Course { get; set; } = null!;

        [Column("title")]
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = null!;

        [Column("description")]
        [StringLength(1000)]
        public string? Description { get; set; }

        [Column("order_in_course")]
        [Required]
        public int OrderInCourse { get; set; }

        // Relación: Un módulo tiene muchas lecciones
        public ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();
    }
} 