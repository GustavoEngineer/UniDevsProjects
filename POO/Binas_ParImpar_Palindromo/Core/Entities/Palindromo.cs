using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProyectoBinas.Core.Entities
{
    /// <summary>
    /// Entidad que representa un palíndromo en el sistema
    /// </summary>
    [Table("palindromos")]
    public class Palindromo
    {
        /// <summary>
        /// Identificador único del palíndromo
        /// </summary>
        public int Palindromo_ID { get; set; }

        /// <summary>
        /// Palabra a verificar si es palíndromo
        /// </summary>
        [Required(ErrorMessage = "La palabra es obligatoria")]
        [StringLength(100, ErrorMessage = "La palabra no puede exceder los 100 caracteres")]
        public string Palabra { get; set; } = string.Empty;

        /// <summary>
        /// Indica si la palabra es un palíndromo
        /// </summary>
        public bool EsPalindromo { get; set; }

        /// <summary>
        /// Fecha de consulta del palíndromo
        /// </summary>
        public DateTime FechaConsulta { get; set; } = DateTime.Now;
    }
} 