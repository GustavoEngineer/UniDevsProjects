using Microsoft.EntityFrameworkCore;
using ProyectoBinas.Core.Entities;
using ProyectoBinas.Core.Interfaces;
using ProyectoBinas.Infrastructure.Data;

namespace ProyectoBinas.Infrastructure.Repositories
{
    /// <summary>
    /// Repositorio para manejar las operaciones de base de datos de números
    /// </summary>
    public class NumeroRepository : INumeroRepository
    {
        private readonly PalindromoDbContext _context;

        /// <summary>
        /// Constructor del repositorio de números
        /// </summary>
        /// <param name="context">Contexto de base de datos</param>
        public NumeroRepository(PalindromoDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Obtiene todos los números
        /// </summary>
        /// <returns>Lista de todos los números</returns>
        public async Task<IEnumerable<Numero>> GetAllAsync()
        {
            return await _context.Numeros
                .OrderByDescending(n => n.Fecha_Consulta)
                .ToListAsync();
        }

        /// <summary>
        /// Obtiene un número por su ID
        /// </summary>
        /// <param name="id">ID del número</param>
        /// <returns>El número encontrado o null</returns>
        public async Task<Numero?> GetByIdAsync(int id)
        {
            return await _context.Numeros.FindAsync(id);
        }

        /// <summary>
        /// Obtiene números por su paridad
        /// </summary>
        /// <param name="esPar">True para números pares, False para impares</param>
        /// <returns>Lista de números filtrados por paridad</returns>
        public async Task<IEnumerable<Numero>> GetByParityAsync(bool esPar)
        {
            return await _context.Numeros
                .Where(n => n.EsPar == esPar)
                .OrderByDescending(n => n.Fecha_Consulta)
                .ToListAsync();
        }

        /// <summary>
        /// Agrega un nuevo número
        /// </summary>
        /// <param name="numero">Número a agregar</param>
        /// <returns>El número agregado</returns>
        public async Task<Numero> AddAsync(Numero numero)
        {
            _context.Numeros.Add(numero);
            await _context.SaveChangesAsync();
            return numero;
        }

        /// <summary>
        /// Actualiza un número existente
        /// </summary>
        /// <param name="numero">Número a actualizar</param>
        /// <returns>El número actualizado</returns>
        public async Task<Numero> UpdateAsync(Numero numero)
        {
            _context.Entry(numero).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return numero;
        }

        /// <summary>
        /// Elimina un número por su ID
        /// </summary>
        /// <param name="id">ID del número a eliminar</param>
        /// <returns>True si se eliminó correctamente</returns>
        public async Task<bool> DeleteAsync(int id)
        {
            var numero = await _context.Numeros.FindAsync(id);
            if (numero == null)
                return false;

            _context.Numeros.Remove(numero);
            await _context.SaveChangesAsync();
            return true;
        }

        /// <summary>
        /// Obtiene una página de números registrados
        /// </summary>
        /// <param name="page">Número de página (1-based)</param>
        /// <param name="pageSize">Tamaño de página</param>
        /// <returns>Página de números</returns>
        public async Task<IEnumerable<Numero>> GetPagedAsync(int page, int pageSize)
        {
            return await _context.Numeros
                .OrderByDescending(n => n.Fecha_Consulta)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        /// <summary>
        /// Obtiene el total de registros de números
        /// </summary>
        /// <returns>Total de registros</returns>
        public async Task<int> GetTotalCountAsync()
        {
            return await _context.Numeros.CountAsync();
        }
    }
} 