using Microsoft.EntityFrameworkCore;
using ProyectoBinas.Core.Entities;
using ProyectoBinas.Core.Interfaces;
using ProyectoBinas.Infrastructure.Data;

namespace ProyectoBinas.Infrastructure.Repositories
{
    /// <summary>
    /// Implementación del repositorio de palíndromos
    /// </summary>
    public class PalindromoRepository : IPalindromoRepository
    {
        private readonly PalindromoDbContext _context;

        /// <summary>
        /// Constructor del repositorio de palíndromos
        /// </summary>
        /// <param name="context">Contexto de la base de datos</param>
        public PalindromoRepository(PalindromoDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Obtiene todos los palíndromos
        /// </summary>
        /// <returns>Lista de todos los palíndromos</returns>
        public async Task<IEnumerable<Palindromo>> GetAllAsync()
        {
            return await _context.Palindromos
                .OrderByDescending(p => p.FechaConsulta)
                .ToListAsync();
        }

        /// <summary>
        /// Obtiene un palíndromo por su ID
        /// </summary>
        /// <param name="id">ID del palíndromo</param>
        /// <returns>El palíndromo encontrado o null</returns>
        public async Task<Palindromo?> GetByIdAsync(int id)
        {
            return await _context.Palindromos.FindAsync(id);
        }

        /// <summary>
        /// Agrega un nuevo palíndromo
        /// </summary>
        /// <param name="palindromo">Palíndromo a agregar</param>
        /// <returns>El palíndromo agregado</returns>
        public async Task<Palindromo> AddAsync(Palindromo palindromo)
        {
            _context.Palindromos.Add(palindromo);
            await _context.SaveChangesAsync();
            return palindromo;
        }

        /// <summary>
        /// Actualiza un palíndromo existente
        /// </summary>
        /// <param name="palindromo">Palíndromo a actualizar</param>
        /// <returns>El palíndromo actualizado</returns>
        public async Task<Palindromo> UpdateAsync(Palindromo palindromo)
        {
            _context.Palindromos.Update(palindromo);
            await _context.SaveChangesAsync();
            return palindromo;
        }

        /// <summary>
        /// Elimina un palíndromo por su ID
        /// </summary>
        /// <param name="id">ID del palíndromo a eliminar</param>
        /// <returns>True si se eliminó correctamente</returns>
        public async Task<bool> DeleteAsync(int id)
        {
            var palindromo = await _context.Palindromos.FindAsync(id);
            if (palindromo == null)
                return false;

            _context.Palindromos.Remove(palindromo);
            await _context.SaveChangesAsync();
            return true;
        }

        /// <summary>
        /// Obtiene los palíndromos paginados
        /// </summary>
        /// <param name="pageNumber">Número de página (inicia en 1)</param>
        /// <param name="pageSize">Tamaño de página</param>
        /// <returns>Tupla con la lista de palíndromos y el total de registros</returns>
        public async Task<(IEnumerable<Palindromo> Palindromos, int TotalRecords)> GetPagedAsync(int pageNumber, int pageSize)
        {
            var query = _context.Palindromos.OrderByDescending(p => p.FechaConsulta);
            var totalRecords = await query.CountAsync();
            var palindromos = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            return (palindromos, totalRecords);
        }
    }
} 