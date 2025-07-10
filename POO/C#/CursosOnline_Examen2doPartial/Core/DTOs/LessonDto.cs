using System.ComponentModel.DataAnnotations;

namespace CursosOnline.Core.DTOs
{
    /// <summary>
    /// DTO para crear o actualizar una lección.
    /// </summary>
    public class LessonCreateUpdateDto
    {
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "El ID del módulo debe ser mayor a 0")]
        public int module_id { get; set; }

        [Required]
        [StringLength(255)]
        public string title { get; set; } = null!;

        [Required]
        public string content { get; set; } = null!;

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "El orden debe ser mayor a 0")]
        public int order_in_module { get; set; }
    }

    /// <summary>
    /// DTO para mostrar información de una lección.
    /// </summary>
    public class LessonDto
    {
        public int lesson_id { get; set; }
        public int module_id { get; set; }
        public string title { get; set; } = null!;
        public string content { get; set; } = null!;
        public int order_in_module { get; set; }
    }
} 