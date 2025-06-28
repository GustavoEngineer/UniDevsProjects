using ProyectoBinas.Core.DTOs;
using ProyectoBinas.Core.Entities;
using ProyectoBinas.Core.Interfaces;

namespace ProyectoBinas.Application.Services
{
    /// <summary>
    /// Servicio para manejar la lógica de negocio de números
    /// </summary>
    public class NumeroService : INumeroService
    {
        private readonly INumeroRepository _numeroRepository;

        /// <summary>
        /// Constructor del servicio de números
        /// </summary>
        /// <param name="numeroRepository">Repositorio de números</param>
        public NumeroService(INumeroRepository numeroRepository)
        {
            _numeroRepository = numeroRepository;
        }

        /// <summary>
        /// Obtiene todos los números
        /// </summary>
        /// <returns>Lista de todos los números</returns>
        public async Task<IEnumerable<NumeroResponseDto>> GetAllAsync()
        {
            var numeros = await _numeroRepository.GetAllAsync();
            return numeros.Select(MapToResponseDto);
        }

        /// <summary>
        /// Obtiene un número por su ID
        /// </summary>
        /// <param name="id">ID del número</param>
        /// <returns>El número encontrado o null</returns>
        public async Task<NumeroResponseDto?> GetByIdAsync(int id)
        {
            var numero = await _numeroRepository.GetByIdAsync(id);
            return numero != null ? MapToResponseDto(numero) : null;
        }

        /// <summary>
        /// Obtiene números por su paridad
        /// </summary>
        /// <param name="esPar">True para números pares, False para impares</param>
        /// <returns>Lista de números filtrados por paridad</returns>
        public async Task<IEnumerable<NumeroResponseDto>> GetByParityAsync(bool esPar)
        {
            var numeros = await _numeroRepository.GetByParityAsync(esPar);
            return numeros.Select(MapToResponseDto);
        }

        /// <summary>
        /// Crea un nuevo número
        /// </summary>
        /// <param name="createDto">DTO con los datos del número</param>
        /// <returns>El número creado</returns>
        public async Task<NumeroResponseDto> CreateAsync(CreateNumeroDto createDto)
        {
            var numero = new Numero
            {
                NumeroValor = createDto.NumeroValor,
                EsPar = IsPar(createDto.NumeroValor),
                Fecha_Consulta = DateTime.Now
            };

            var numeroCreado = await _numeroRepository.AddAsync(numero);
            return MapToResponseDto(numeroCreado);
        }

        /// <summary>
        /// Actualiza un número existente
        /// </summary>
        /// <param name="id">ID del número a actualizar</param>
        /// <param name="updateDto">DTO con los nuevos datos</param>
        /// <returns>El número actualizado</returns>
        public async Task<NumeroResponseDto?> UpdateAsync(int id, UpdateNumeroDto updateDto)
        {
            var numeroExistente = await _numeroRepository.GetByIdAsync(id);
            if (numeroExistente == null)
                return null;

            numeroExistente.NumeroValor = updateDto.NumeroValor;
            numeroExistente.EsPar = IsPar(updateDto.NumeroValor);
            numeroExistente.Fecha_Consulta = DateTime.Now;

            var numeroActualizado = await _numeroRepository.UpdateAsync(numeroExistente);
            return MapToResponseDto(numeroActualizado);
        }

        /// <summary>
        /// Elimina un número por su ID
        /// </summary>
        /// <param name="id">ID del número a eliminar</param>
        /// <returns>True si se eliminó correctamente</returns>
        public async Task<bool> DeleteAsync(int id)
        {
            return await _numeroRepository.DeleteAsync(id);
        }

        /// <summary>
        /// Verifica si un número es par o impar sin guardar en base de datos
        /// </summary>
        /// <param name="valor">Valor a verificar</param>
        /// <returns>Resultado de la verificación</returns>
        public VerificacionNumeroDto VerificarNumero(int valor)
        {
            return new VerificacionNumeroDto
            {
                NumeroValor = valor,
                EsPar = IsPar(valor),
                EsImpar = !IsPar(valor),
                FechaVerificacion = DateTime.Now
            };
        }

        /// <summary>
        /// Verifica múltiples números sin guardar en base de datos
        /// </summary>
        /// <param name="numeros">Lista de números a verificar</param>
        /// <returns>Resultados de la verificación</returns>
        public VerificacionMultiplesNumerosDto VerificarMultiplesNumeros(List<int> numeros)
        {
            var resultados = numeros.Select(n => new VerificacionNumeroDto
            {
                NumeroValor = n,
                EsPar = IsPar(n),
                EsImpar = !IsPar(n),
                FechaVerificacion = DateTime.Now
            }).ToList();

            return new VerificacionMultiplesNumerosDto
            {
                Numeros = numeros,
                Resultados = resultados
            };
        }

        /// <summary>
        /// Determina si un número es par
        /// </summary>
        /// <param name="numero">Número a verificar</param>
        /// <returns>True si es par, False si es impar</returns>
        private static bool IsPar(int numero)
        {
            return numero % 2 == 0;
        }

        /// <summary>
        /// Mapea una entidad Numero a NumeroResponseDto
        /// </summary>
        /// <param name="numero">Entidad a mapear</param>
        /// <returns>DTO mapeado</returns>
        private static NumeroResponseDto MapToResponseDto(Numero numero)
        {
            return new NumeroResponseDto
            {
                Consulta_ID = numero.Consulta_ID,
                NumeroValor = numero.NumeroValor,
                EsPar = numero.EsPar,
                EsImpar = !numero.EsPar,
                Fecha_Consulta = numero.Fecha_Consulta
            };
        }

        /// <summary>
        /// Obtiene una página de números registrados
        /// </summary>
        /// <param name="page">Número de página (1-based)</param>
        /// <param name="pageSize">Tamaño de página</param>
        /// <returns>Página de números</returns>
        public async Task<IEnumerable<NumeroResponseDto>> GetPagedAsync(int page, int pageSize)
        {
            var numeros = await _numeroRepository.GetPagedAsync(page, pageSize);
            return numeros.Select(MapToResponseDto);
        }

        /// <summary>
        /// Obtiene el total de registros de números
        /// </summary>
        /// <returns>Total de registros</returns>
        public async Task<int> GetTotalCountAsync()
        {
            return await _numeroRepository.GetTotalCountAsync();
        }
    }

    /// <summary>
    /// Interfaz del servicio de números
    /// </summary>
    public interface INumeroService
    {
        /// <summary>
        /// Obtiene todos los números
        /// </summary>
        /// <returns>Lista de todos los números</returns>
        Task<IEnumerable<NumeroResponseDto>> GetAllAsync();

        /// <summary>
        /// Obtiene un número por su ID
        /// </summary>
        /// <param name="id">ID del número</param>
        /// <returns>El número encontrado o null</returns>
        Task<NumeroResponseDto?> GetByIdAsync(int id);

        /// <summary>
        /// Obtiene números por su paridad
        /// </summary>
        /// <param name="esPar">True para números pares, False para impares</param>
        /// <returns>Lista de números filtrados por paridad</returns>
        Task<IEnumerable<NumeroResponseDto>> GetByParityAsync(bool esPar);

        /// <summary>
        /// Crea un nuevo número
        /// </summary>
        /// <param name="createDto">DTO con los datos del número</param>
        /// <returns>El número creado</returns>
        Task<NumeroResponseDto> CreateAsync(CreateNumeroDto createDto);

        /// <summary>
        /// Actualiza un número existente
        /// </summary>
        /// <param name="id">ID del número a actualizar</param>
        /// <param name="updateDto">DTO con los nuevos datos</param>
        /// <returns>El número actualizado</returns>
        Task<NumeroResponseDto?> UpdateAsync(int id, UpdateNumeroDto updateDto);

        /// <summary>
        /// Elimina un número por su ID
        /// </summary>
        /// <param name="id">ID del número a eliminar</param>
        /// <returns>True si se eliminó correctamente</returns>
        Task<bool> DeleteAsync(int id);

        /// <summary>
        /// Verifica si un número es par o impar sin guardar en base de datos
        /// </summary>
        /// <param name="valor">Valor a verificar</param>
        /// <returns>Resultado de la verificación</returns>
        VerificacionNumeroDto VerificarNumero(int valor);

        /// <summary>
        /// Verifica múltiples números sin guardar en base de datos
        /// </summary>
        /// <param name="numeros">Lista de números a verificar</param>
        /// <returns>Resultados de la verificación</returns>
        VerificacionMultiplesNumerosDto VerificarMultiplesNumeros(List<int> numeros);

        /// <summary>
        /// Obtiene una página de números registrados
        /// </summary>
        /// <param name="page">Número de página (1-based)</param>
        /// <param name="pageSize">Tamaño de página</param>
        /// <returns>Página de números</returns>
        Task<IEnumerable<NumeroResponseDto>> GetPagedAsync(int page, int pageSize);

        /// <summary>
        /// Obtiene el total de registros de números
        /// </summary>
        /// <returns>Total de registros</returns>
        Task<int> GetTotalCountAsync();
    }
} 