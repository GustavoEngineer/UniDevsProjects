namespace BinasCesar.Core.DTOs;

public class PaginacionRespuestaDto<T>
{
    public int PaginaActual { get; set; }
    public int TotalPaginas { get; set; }
    public int TotalRegistros { get; set; }
    public int? PaginaAnterior { get; set; }
    public int? PaginaSiguiente { get; set; }
    public int RegistrosPorPagina { get; set; }
    public IEnumerable<T> Registros { get; set; } = new List<T>();
} 