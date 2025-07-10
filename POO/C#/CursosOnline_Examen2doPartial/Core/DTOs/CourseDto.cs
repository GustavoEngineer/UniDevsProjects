using System.ComponentModel.DataAnnotations;

namespace CursosOnline.Core.DTOs
{
    /// <summary>
    /// DTO para crear o actualizar un curso.
    /// </summary>
    public class CourseCreateUpdateDto
    {
        [Required]
        [StringLength(255)]
        public string title { get; set; } = null!;

        [StringLength(1000)]
        public string? description { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "El ID del instructor debe ser mayor a 0")]
        public int instructor_id { get; set; }
    }

    /// <summary>
    /// DTO para mostrar información de un curso.
    /// </summary>
    public class CourseDto
    {
        public int course_id { get; set; }
        public string title { get; set; } = null!;
        public string? description { get; set; }
        public int instructor_id { get; set; }
        public string InstructorName { get; set; } = null!;
        public bool is_published { get; set; }
        public DateTime? published_date { get; set; }
    }
} 