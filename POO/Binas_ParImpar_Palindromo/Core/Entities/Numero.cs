using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProyectoBinas.Core.Entities
{
    /// <summary>
    /// Entidad que representa un número en la tabla parimpar
    /// </summary>
    [Table("parimpar")]
    public class Numero
    {
        /// <summary>
        /// Identificador único de la consulta
        /// </summary>
        [Key]
        [Column("Consulta_ID")]
        public int Consulta_ID { get; set; }

        /// <summary>
        /// Valor numérico a verificar
        /// </summary>
        [Required(ErrorMessage = "El número es obligatorio")]
        [Column("Numero")]
        public int NumeroValor { get; set; }

        /// <summary>
        /// Indica si el número es par
        /// </summary>
        [Column("EsPar")]
        public bool EsPar { get; set; }

        /// <summary>
        /// Fecha de consulta del número
        /// </summary>
        [Column("Fecha_Consulta")]
        public DateTime Fecha_Consulta { get; set; } = DateTime.Now;
    }
} 