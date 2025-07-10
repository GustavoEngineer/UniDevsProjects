using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CursosOnline.Core.Entities
{
    /// <summary>
    /// Lección de un módulo. Pertenece a un módulo.
    /// </summary>
    public class Lesson
    {
        [Key]
        [Column("lesson_id")]
        public int LessonId { get; set; }

        // Relación: Una lección pertenece a un módulo
        [Column("module_id")]
        public int ModuleId { get; set; }
        public Module Module { get; set; } = null!;

        [Column("title")]
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = null!;

        [Column("content")]
        [Required]
        public string Content { get; set; } = null!;

        [Column("order_in_module")]
        [Required]
        public int OrderInModule { get; set; }
    }
} 