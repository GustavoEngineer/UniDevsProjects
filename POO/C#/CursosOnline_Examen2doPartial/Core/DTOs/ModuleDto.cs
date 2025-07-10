using System.ComponentModel.DataAnnotations;

namespace CursosOnline.Core.DTOs
{
    /// <summary>
    /// DTO para crear o actualizar un módulo.
    /// </summary>
    public class ModuleCreateUpdateDto
    {
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "El ID del curso debe ser mayor a 0")]
        public int course_id { get; set; }

        [Required]
        [StringLength(255)]
        public string title { get; set; } = null!;

        [StringLength(1000)]
        public string? description { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "El orden debe ser mayor a 0")]
        public int order_in_course { get; set; }
    }

    /// <summary>
    /// DTO para mostrar información de un módulo.
    /// </summary>
    public class ModuleDto
    {
        public int module_id { get; set; }
        public int course_id { get; set; }
        public string title { get; set; } = null!;
        public string? description { get; set; }
        public int order_in_course { get; set; }
    }
} 