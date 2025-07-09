using ProyectoBinas.Core.Entities;

namespace ProyectoBinas.Core.Interfaces
{
    /// <summary>
    /// Interfaz para el repositorio de números
    /// </summary>
    public interface INumeroRepository
    {
        /// <summary>
        /// Obtiene todos los números
        /// </summary>
        /// <returns>Lista de todos los números</returns>
        Task<IEnumerable<Numero>> GetAllAsync();

        /// <summary>
        /// Obtiene un número por su ID
        /// </summary>
        /// <param name="id">ID del número</param>
        /// <returns>El número encontrado o null</returns>
        Task<Numero?> GetByIdAsync(int id);

        /// <summary>
        /// Obtiene números por su paridad
        /// </summary>
        /// <param name="esPar">True para números pares, False para impares</param>
        /// <returns>Lista de números filtrados por paridad</returns>
        Task<IEnumerable<Numero>> GetByParityAsync(bool esPar);

        /// <summary>
        /// Agrega un nuevo número
        /// </summary>
        /// <param name="numero">Número a agregar</param>
        /// <returns>El número agregado</returns>
        Task<Numero> AddAsync(Numero numero);

        /// <summary>
        /// Actualiza un número existente
        /// </summary>
        /// <param name="numero">Número a actualizar</param>
        /// <returns>El número actualizado</returns>
        Task<Numero> UpdateAsync(Numero numero);

        /// <summary>
        /// Elimina un número por su ID
        /// </summary>
        /// <param name="id">ID del número a eliminar</param>
        /// <returns>True si se eliminó correctamente</returns>
        Task<bool> DeleteAsync(int id);

        /// <summary>
        /// Obtiene una página de números
        /// </summary>
        /// <param name="page">Número de página (1-based)</param>
        /// <param name="pageSize">Tamaño de página</param>
        /// <returns>Página de números</returns>
        Task<IEnumerable<Numero>> GetPagedAsync(int page, int pageSize);

        /// <summary>
        /// Obtiene el total de números
        /// </summary>
        /// <returns>Total de registros</returns>
        Task<int> GetTotalCountAsync();
    }
} 