using ProyectoBinas.Core.Entities;

namespace ProyectoBinas.Core.Interfaces
{
    /// <summary>
    /// Interfaz para el repositorio de palíndromos
    /// </summary>
    public interface IPalindromoRepository
    {
        /// <summary>
        /// Obtiene todos los palíndromos
        /// </summary>
        /// <returns>Lista de todos los palíndromos</returns>
        Task<IEnumerable<Palindromo>> GetAllAsync();

        /// <summary>
        /// Obtiene un palíndromo por su ID
        /// </summary>
        /// <param name="id">ID del palíndromo</param>
        /// <returns>El palíndromo encontrado o null</returns>
        Task<Palindromo?> GetByIdAsync(int id);

        /// <summary>
        /// Agrega un nuevo palíndromo
        /// </summary>
        /// <param name="palindromo">Palíndromo a agregar</param>
        /// <returns>El palíndromo agregado</returns>
        Task<Palindromo> AddAsync(Palindromo palindromo);

        /// <summary>
        /// Actualiza un palíndromo existente
        /// </summary>
        /// <param name="palindromo">Palíndromo a actualizar</param>
        /// <returns>El palíndromo actualizado</returns>
        Task<Palindromo> UpdateAsync(Palindromo palindromo);

        /// <summary>
        /// Elimina un palíndromo por su ID
        /// </summary>
        /// <param name="id">ID del palíndromo a eliminar</param>
        /// <returns>True si se eliminó correctamente</returns>
        Task<bool> DeleteAsync(int id);

        /// <summary>
        /// Obtiene los palíndromos paginados
        /// </summary>
        /// <param name="pageNumber">Número de página (inicia en 1)</param>
        /// <param name="pageSize">Tamaño de página</param>
        /// <returns>Tupla con la lista de palíndromos y el total de registros</returns>
        Task<(IEnumerable<Palindromo> Palindromos, int TotalRecords)> GetPagedAsync(int pageNumber, int pageSize);
    }
} 