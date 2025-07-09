using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BinasCesar.Core.Entities;

[Table("MensajeCifradoSimple")]
public class MensajeCifrado
{
    [Key]
    [Column("id_cifrado")]
    public int IdCifrado { get; set; }

    [Required]
    [Column("mensaje_cifrado")]
    public string MensajeCifradoTexto { get; set; } = string.Empty;

    [Required]
    [Column("saltos")]
    public int Saltos { get; set; }
} 