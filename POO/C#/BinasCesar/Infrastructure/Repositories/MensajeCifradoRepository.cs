using BinasCesar.Core.Entities;
using BinasCesar.Core.Interfaces;
using BinasCesar.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BinasCesar.Infrastructure.Repositories;

public class MensajeCifradoRepository : IMensajeCifradoRepository
{
    private readonly ApplicationDbContext _context;

    public MensajeCifradoRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<MensajeCifrado>> GetAllAsync()
    {
        return await _context.MensajesCifrados.ToListAsync();
    }

    public async Task<MensajeCifrado?> GetByIdAsync(int id)
    {
        return await _context.MensajesCifrados.FindAsync(id);
    }

    public async Task<MensajeCifrado> CreateAsync(MensajeCifrado mensaje)
    {
        _context.MensajesCifrados.Add(mensaje);
        await _context.SaveChangesAsync();
        return mensaje;
    }

    public async Task<MensajeCifrado?> UpdateAsync(int id, MensajeCifrado mensaje)
    {
        var existingMensaje = await _context.MensajesCifrados.FindAsync(id);
        if (existingMensaje == null)
            return null;

        existingMensaje.MensajeCifradoTexto = mensaje.MensajeCifradoTexto;
        existingMensaje.Saltos = mensaje.Saltos;

        await _context.SaveChangesAsync();
        return existingMensaje;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var mensaje = await _context.MensajesCifrados.FindAsync(id);
        if (mensaje == null)
            return false;

        _context.MensajesCifrados.Remove(mensaje);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<(IEnumerable<MensajeCifrado> registros, int totalRegistros)> GetPagedAsync(int pagina, int registrosPorPagina)
    {
        var query = _context.MensajesCifrados;
        var totalRegistros = await query.CountAsync();
        var registros = await query
            .Skip((pagina - 1) * registrosPorPagina)
            .Take(registrosPorPagina)
            .ToListAsync();
        return (registros, totalRegistros);
    }

    public async Task<MensajeCifrado?> GetByCifradoAndDesplazamientoAsync(string mensajeCifrado, int saltos)
    {
        return await _context.MensajesCifrados.FirstOrDefaultAsync(m => m.MensajeCifradoTexto == mensajeCifrado && m.Saltos == saltos);
    }
} 