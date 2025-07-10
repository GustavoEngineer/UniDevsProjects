using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CursosOnline.Core.Entities
{
    /// <summary>
    /// Curso impartido por un instructor. Es el Aggregate Root para módulos y lecciones.
    /// </summary>
    public class Course
    {
        [Key]
        [Column("course_id")]
        public int CourseId { get; set; }

        [Required]
        [StringLength(200)]
        [Column("title")]
        public string Title { get; set; } = null!;

        [StringLength(1000)]
        [Column("description")]
        public string? Description { get; set; }

        // Relación: Un curso es impartido por un instructor
        [Column("instructor_id")]
        public int InstructorId { get; set; }
        public Instructor Instructor { get; set; } = null!;

        // Regla de negocio: Si IsPublished es true, no se pueden modificar módulos o lecciones
        [Column("is_published")]
        public bool IsPublished { get; set; } = false;
        [Column("published_date")]
        public DateTime? PublishedDate { get; set; }

        // Relación: Un curso tiene muchos módulos
        public ICollection<Module> Modules { get; set; } = new List<Module>();
    }
} 