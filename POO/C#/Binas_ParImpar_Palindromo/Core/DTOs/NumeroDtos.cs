using System.ComponentModel.DataAnnotations;

namespace ProyectoBinas.Core.DTOs
{
    /// <summary>
    /// DTO para crear un nuevo número
    /// </summary>
    public class CreateNumeroDto
    {
        /// <summary>
        /// Valor numérico a verificar
        /// </summary>
        [Required(ErrorMessage = "El número es obligatorio")]
        [Range(1, int.MaxValue, ErrorMessage = "El número debe ser mayor a 0")]
        public int NumeroValor { get; set; }
    }

    /// <summary>
    /// DTO para actualizar un número existente
    /// </summary>
    public class UpdateNumeroDto
    {
        /// <summary>
        /// Valor numérico a verificar
        /// </summary>
        [Required(ErrorMessage = "El número es obligatorio")]
        [Range(1, int.MaxValue, ErrorMessage = "El número debe ser mayor a 0")]
        public int NumeroValor { get; set; }
    }

    /// <summary>
    /// DTO para la respuesta de número
    /// </summary>
    public class NumeroResponseDto
    {
        /// <summary>
        /// Identificador único del número
        /// </summary>
        public int Consulta_ID { get; set; }

        /// <summary>
        /// Valor numérico verificado
        /// </summary>
        public int NumeroValor { get; set; }

        /// <summary>
        /// Indica si el número es par
        /// </summary>
        public bool EsPar { get; set; }

        /// <summary>
        /// Indica si el número es impar
        /// </summary>
        public bool EsImpar { get; set; }

        /// <summary>
        /// Fecha de consulta del número
        /// </summary>
        public DateTime Fecha_Consulta { get; set; }
    }

    /// <summary>
    /// DTO para la verificación de número sin guardar en base de datos
    /// </summary>
    public class VerificacionNumeroDto
    {
        /// <summary>
        /// Valor numérico verificado
        /// </summary>
        public int NumeroValor { get; set; }

        /// <summary>
        /// Indica si el número es par
        /// </summary>
        public bool EsPar { get; set; }

        /// <summary>
        /// Indica si el número es impar
        /// </summary>
        public bool EsImpar { get; set; }

        /// <summary>
        /// Fecha de verificación
        /// </summary>
        public DateTime FechaVerificacion { get; set; }
    }

    /// <summary>
    /// DTO para verificar múltiples números
    /// </summary>
    public class VerificacionMultiplesNumerosDto
    {
        /// <summary>
        /// Lista de números a verificar
        /// </summary>
        [Required(ErrorMessage = "La lista de números es obligatoria")]
        [MinLength(1, ErrorMessage = "Debe proporcionar al menos un número")]
        public List<int> Numeros { get; set; } = new List<int>();

        /// <summary>
        /// Resultados de la verificación
        /// </summary>
        public List<VerificacionNumeroDto> Resultados { get; set; } = new List<VerificacionNumeroDto>();
    }
} 