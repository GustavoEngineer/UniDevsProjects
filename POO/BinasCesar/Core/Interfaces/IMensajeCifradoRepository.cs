using BinasCesar.Core.Entities;

namespace BinasCesar.Core.Interfaces;

public interface IMensajeCifradoRepository
{
    Task<IEnumerable<MensajeCifrado>> GetAllAsync();
    Task<(IEnumerable<MensajeCifrado> registros, int totalRegistros)> GetPagedAsync(int pagina, int registrosPorPagina);
    Task<MensajeCifrado?> GetByIdAsync(int id);
    Task<MensajeCifrado> CreateAsync(MensajeCifrado mensaje);
    Task<MensajeCifrado?> UpdateAsync(int id, MensajeCifrado mensaje);
    Task<bool> DeleteAsync(int id);
    Task<MensajeCifrado?> GetByCifradoAndDesplazamientoAsync(string cifrado, int desplazamiento);
} 