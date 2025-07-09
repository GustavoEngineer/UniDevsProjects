using System.ComponentModel.DataAnnotations;

namespace ProyectoBinas.Core.DTOs
{
    /// <summary>
    /// DTO para crear un nuevo palíndromo
    /// </summary>
    public class CreatePalindromoDto
    {
        /// <summary>
        /// Palabra a verificar si es palíndromo
        /// </summary>
        [Required(ErrorMessage = "La palabra es obligatoria")]
        [StringLength(100, ErrorMessage = "La palabra no puede exceder los 100 caracteres")]
        public string Palabra { get; set; } = string.Empty;
    }

    /// <summary>
    /// DTO para actualizar un palíndromo existente
    /// </summary>
    public class UpdatePalindromoDto
    {
        /// <summary>
        /// Palabra a verificar si es palíndromo
        /// </summary>
        [Required(ErrorMessage = "La palabra es obligatoria")]
        [StringLength(100, ErrorMessage = "La palabra no puede exceder los 100 caracteres")]
        public string Palabra { get; set; } = string.Empty;
    }

    /// <summary>
    /// DTO para la respuesta de palíndromo
    /// </summary>
    public class PalindromoResponseDto
    {
        /// <summary>
        /// Identificador único del palíndromo
        /// </summary>
        public int Palindromo_ID { get; set; }

        /// <summary>
        /// Palabra verificada
        /// </summary>
        public string Palabra { get; set; } = string.Empty;

        /// <summary>
        /// Indica si la palabra es un palíndromo
        /// </summary>
        public bool EsPalindromo { get; set; }

        /// <summary>
        /// Fecha de consulta del palíndromo
        /// </summary>
        public DateTime FechaConsulta { get; set; }
    }

    /// <summary>
    /// DTO para la verificación de palíndromo sin guardar en base de datos
    /// </summary>
    public class VerificacionPalindromoDto
    {
        /// <summary>
        /// Palabra verificada
        /// </summary>
        public string Palabra { get; set; } = string.Empty;

        /// <summary>
        /// Indica si la palabra es un palíndromo
        /// </summary>
        public bool EsPalindromo { get; set; }

        /// <summary>
        /// Fecha de verificación
        /// </summary>
        public DateTime FechaVerificacion { get; set; }
    }

    /// <summary>
    /// DTO para la respuesta paginada de palíndromos
    /// </summary>
    public class PagedPalindromoResponseDto
    {
        /// <summary>
        /// Lista de palíndromos en la página actual
        /// </summary>
        public IEnumerable<PalindromoResponseDto> Palindromos { get; set; } = new List<PalindromoResponseDto>();

        /// <summary>
        /// Número total de páginas
        /// </summary>
        public int TotalPages { get; set; }

        /// <summary>
        /// Número total de registros
        /// </summary>
        public int TotalRecords { get; set; }

        /// <summary>
        /// Página actual
        /// </summary>
        public int CurrentPage { get; set; }

        /// <summary>
        /// Número de registros en la página actual
        /// </summary>
        public int RecordsInPage { get; set; }

        /// <summary>
        /// Página anterior (null si no hay)
        /// </summary>
        public int? PreviousPage { get; set; }

        /// <summary>
        /// Página siguiente (null si no hay)
        /// </summary>
        public int? NextPage { get; set; }
    }
} 