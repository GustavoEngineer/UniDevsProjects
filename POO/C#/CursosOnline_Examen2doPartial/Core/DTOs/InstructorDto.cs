using System.ComponentModel.DataAnnotations;

namespace CursosOnline.Core.DTOs
{
    /// <summary>
    /// DTO para crear o actualizar un instructor.
    /// </summary>
    public class InstructorCreateUpdateDto
    {
        [Required]
        [StringLength(255)]
        public string name { get; set; } = null!;

        [Required]
        [EmailAddress]
        [StringLength(255)]
        public string email { get; set; } = null!;
    }

    /// <summary>
    /// DTO para mostrar información de un instructor.
    /// </summary>
    public class InstructorDto
    {
        public int instructor_id { get; set; }
        public string name { get; set; } = null!;
        public string email { get; set; } = null!;
    }
} 