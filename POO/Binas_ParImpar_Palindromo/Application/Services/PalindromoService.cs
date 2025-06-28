using ProyectoBinas.Core.Entities;
using ProyectoBinas.Core.Interfaces;
using ProyectoBinas.Core.DTOs;

namespace ProyectoBinas.Application.Services
{
    /// <summary>
    /// Servicio de aplicación para la gestión de palíndromos
    /// </summary>
    public class PalindromoService
    {
        private readonly IPalindromoRepository _palindromoRepository;

        /// <summary>
        /// Constructor del servicio de palíndromos
        /// </summary>
        /// <param name="palindromoRepository">Repositorio de palíndromos</param>
        public PalindromoService(IPalindromoRepository palindromoRepository)
        {
            _palindromoRepository = palindromoRepository;
        }

        /// <summary>
        /// Obtiene todos los palíndromos
        /// </summary>
        /// <returns>Lista de todos los palíndromos</returns>
        public async Task<IEnumerable<Palindromo>> GetAllPalindromosAsync()
        {
            return await _palindromoRepository.GetAllAsync();
        }

        /// <summary>
        /// Obtiene un palíndromo por su ID
        /// </summary>
        /// <param name="id">ID del palíndromo</param>
        /// <returns>El palíndromo encontrado o null</returns>
        public async Task<Palindromo?> GetPalindromoByIdAsync(int id)
        {
            return await _palindromoRepository.GetByIdAsync(id);
        }

        /// <summary>
        /// Agrega un nuevo palíndromo
        /// </summary>
        /// <param name="palindromo">Palíndromo a agregar</param>
        /// <returns>El palíndromo agregado</returns>
        public async Task<Palindromo> AddPalindromoAsync(Palindromo palindromo)
        {
            // Verificar si es palíndromo antes de guardar
            palindromo.EsPalindromo = VerificarPalindromo(palindromo.Palabra);
            palindromo.FechaConsulta = DateTime.Now;

            return await _palindromoRepository.AddAsync(palindromo);
        }

        /// <summary>
        /// Actualiza un palíndromo existente
        /// </summary>
        /// <param name="palindromo">Palíndromo a actualizar</param>
        /// <returns>El palíndromo actualizado</returns>
        public async Task<Palindromo> UpdatePalindromoAsync(Palindromo palindromo)
        {
            // Verificar si es palíndromo antes de actualizar
            palindromo.EsPalindromo = VerificarPalindromo(palindromo.Palabra);
            palindromo.FechaConsulta = DateTime.Now;

            return await _palindromoRepository.UpdateAsync(palindromo);
        }

        /// <summary>
        /// Elimina un palíndromo por su ID
        /// </summary>
        /// <param name="id">ID del palíndromo a eliminar</param>
        /// <returns>True si se eliminó correctamente</returns>
        public async Task<bool> DeletePalindromoAsync(int id)
        {
            return await _palindromoRepository.DeleteAsync(id);
        }

        /// <summary>
        /// Verifica si una palabra es palíndromo
        /// </summary>
        /// <param name="palabra">Palabra a verificar</param>
        /// <returns>True si es palíndromo, false en caso contrario</returns>
        public bool VerificarPalindromo(string palabra)
        {
            if (string.IsNullOrWhiteSpace(palabra))
                return false;

            // Normalizar la palabra (convertir a minúsculas y remover espacios)
            string palabraNormalizada = palabra.ToLower().Replace(" ", "").Replace("-", "").Replace("_", "");
            
            // Remover acentos y caracteres especiales
            palabraNormalizada = RemoveAccents(palabraNormalizada);

            // Verificar si es palíndromo
            int longitud = palabraNormalizada.Length;
            for (int i = 0; i < longitud / 2; i++)
            {
                if (palabraNormalizada[i] != palabraNormalizada[longitud - 1 - i])
                {
                    return false;
                }
            }

            return true;
        }

        /// <summary>
        /// Remueve acentos de una cadena
        /// </summary>
        /// <param name="text">Texto con acentos</param>
        /// <returns>Texto sin acentos</returns>
        private string RemoveAccents(string text)
        {
            string normalizedString = text.Normalize(System.Text.NormalizationForm.FormD);
            var stringBuilder = new System.Text.StringBuilder();

            foreach (char c in normalizedString)
            {
                if (System.Globalization.CharUnicodeInfo.GetUnicodeCategory(c) != System.Globalization.UnicodeCategory.NonSpacingMark)
                    stringBuilder.Append(c);
            }

            return stringBuilder.ToString().Normalize(System.Text.NormalizationForm.FormC);
        }

        /// <summary>
        /// Obtiene los palíndromos paginados y los metadatos de paginación
        /// </summary>
        /// <param name="pageNumber">Número de página (inicia en 1)</param>
        /// <param name="pageSize">Tamaño de página</param>
        /// <returns>DTO con la lista de palíndromos y metadatos de paginación</returns>
        public async Task<PagedPalindromoResponseDto> GetPagedPalindromosAsync(int pageNumber, int pageSize)
        {
            var (palindromos, totalRecords) = await _palindromoRepository.GetPagedAsync(pageNumber, pageSize);
            var totalPages = (int)Math.Ceiling((double)totalRecords / pageSize);
            var palindromoDtos = palindromos.Select(p => new PalindromoResponseDto
            {
                Palindromo_ID = p.Palindromo_ID,
                Palabra = p.Palabra,
                EsPalindromo = p.EsPalindromo,
                FechaConsulta = p.FechaConsulta
            });

            return new PagedPalindromoResponseDto
            {
                Palindromos = palindromoDtos,
                TotalPages = totalPages,
                TotalRecords = totalRecords,
                CurrentPage = pageNumber,
                RecordsInPage = palindromoDtos.Count(),
                PreviousPage = pageNumber > 1 ? pageNumber - 1 : (int?)null,
                NextPage = pageNumber < totalPages ? pageNumber + 1 : (int?)null
            };
        }
    }
} 