using BinasCesar.Core.DTOs;
using BinasCesar.Core.Entities;
using BinasCesar.Core.Interfaces;

namespace BinasCesar.Application.Services;

public class CifradoCesarService
{
    private readonly IMensajeCifradoRepository _repository;

    public CifradoCesarService(IMensajeCifradoRepository repository)
    {
        _repository = repository;
    }

    public string CifrarMensaje(string mensaje, int desplazamiento)
    {
        if (string.IsNullOrEmpty(mensaje))
            return string.Empty;

        var resultado = new char[mensaje.Length];
        
        for (int i = 0; i < mensaje.Length; i++)
        {
            char c = mensaje[i];
            
            if (char.IsLetter(c))
            {
                char baseChar = char.IsUpper(c) ? 'A' : 'a';
                resultado[i] = (char)(((c - baseChar + desplazamiento) % 26 + 26) % 26 + baseChar);
            }
            else
            {
                resultado[i] = c; // Mantener caracteres no alfabéticos
            }
        }
        
        return new string(resultado);
    }

    public string DescifrarMensaje(string mensajeCifrado, int desplazamiento)
    {
        return CifrarMensaje(mensajeCifrado, -desplazamiento);
    }

    public async Task<MensajeCifradoDto> CrearMensajeCifradoAsync(CrearMensajeDto dto)
    {
        var mensajeCifrado = CifrarMensaje(dto.MensajeOriginal, dto.Desplazamiento);
        var existente = await _repository.GetByCifradoAndDesplazamientoAsync(mensajeCifrado, dto.Desplazamiento);
        if (existente != null)
            throw new InvalidOperationException("El mensaje cifrado con ese desplazamiento ya existe.");
        var entidad = new MensajeCifrado
        {
            MensajeCifradoTexto = mensajeCifrado,
            Saltos = dto.Desplazamiento
        };
        var resultado = await _repository.CreateAsync(entidad);
        return new MensajeCifradoDto
        {
            IdCifrado = resultado.IdCifrado,
            MensajeCifradoTexto = resultado.MensajeCifradoTexto,
            Saltos = resultado.Saltos
        };
    }

    public async Task<IEnumerable<MensajeCifradoDto>> ObtenerTodosAsync()
    {
        var mensajes = await _repository.GetAllAsync();
        return mensajes.Select(m => new MensajeCifradoDto
        {
            IdCifrado = m.IdCifrado,
            MensajeCifradoTexto = m.MensajeCifradoTexto,
            Saltos = m.Saltos
        });
    }

    public async Task<MensajeCifradoDto?> ObtenerPorIdAsync(int id)
    {
        var mensaje = await _repository.GetByIdAsync(id);
        if (mensaje == null)
            return null;

        return new MensajeCifradoDto
        {
            IdCifrado = mensaje.IdCifrado,
            MensajeCifradoTexto = mensaje.MensajeCifradoTexto,
            Saltos = mensaje.Saltos
        };
    }

    public async Task<MensajeCifradoDto?> ActualizarAsync(int id, ActualizarMensajeDto dto)
    {
        var mensajeCifrado = CifrarMensaje(dto.MensajeOriginal, dto.Desplazamiento);
        
        var entidad = new MensajeCifrado
        {
            MensajeCifradoTexto = mensajeCifrado,
            Saltos = dto.Desplazamiento
        };

        var resultado = await _repository.UpdateAsync(id, entidad);
        if (resultado == null)
            return null;

        return new MensajeCifradoDto
        {
            IdCifrado = resultado.IdCifrado,
            MensajeCifradoTexto = resultado.MensajeCifradoTexto,
            Saltos = resultado.Saltos
        };
    }

    public async Task<bool> EliminarAsync(int id)
    {
        return await _repository.DeleteAsync(id);
    }

    public async Task<PaginacionRespuestaDto<MensajeCifradoDto>> ObtenerPaginadoAsync(int pagina, int registrosPorPagina)
    {
        if (pagina < 1) pagina = 1;
        if (registrosPorPagina < 1) registrosPorPagina = 10;
        var (registros, totalRegistros) = await _repository.GetPagedAsync(pagina, registrosPorPagina);
        var totalPaginas = (int)Math.Ceiling((double)totalRegistros / registrosPorPagina);
        var dtos = registros.Select(m => new MensajeCifradoDto
        {
            IdCifrado = m.IdCifrado,
            MensajeCifradoTexto = m.MensajeCifradoTexto,
            Saltos = m.Saltos
        });
        return new PaginacionRespuestaDto<MensajeCifradoDto>
        {
            PaginaActual = pagina,
            TotalPaginas = totalPaginas,
            TotalRegistros = totalRegistros,
            PaginaAnterior = pagina > 1 ? pagina - 1 : (int?)null,
            PaginaSiguiente = pagina < totalPaginas ? pagina + 1 : (int?)null,
            RegistrosPorPagina = registrosPorPagina,
            Registros = dtos
        };
    }

    public async Task<MensajeCompletoDto?> ObtenerMensajeCompletoAsync(int id)
    {
        var mensaje = await _repository.GetByIdAsync(id);
        if (mensaje == null)
            return null;

        var mensajeDescifrado = DescifrarMensaje(mensaje.MensajeCifradoTexto, mensaje.Saltos);

        return new MensajeCompletoDto
        {
            IdCifrado = mensaje.IdCifrado,
            MensajeCifradoTexto = mensaje.MensajeCifradoTexto,
            MensajeDescifrado = mensajeDescifrado,
            Saltos = mensaje.Saltos
        };
    }

    public async Task<MensajeCifradoDto> GuardarMensajeCifradoAsync(GuardarMensajeCifradoDto dto)
    {
        var existente = await _repository.GetByCifradoAndDesplazamientoAsync(dto.MensajeCifrado, dto.Desplazamiento);
        if (existente != null)
            throw new InvalidOperationException("El mensaje cifrado con ese desplazamiento ya existe.");
        var entidad = new MensajeCifrado
        {
            MensajeCifradoTexto = dto.MensajeCifrado,
            Saltos = dto.Desplazamiento
        };
        var resultado = await _repository.CreateAsync(entidad);
        return new MensajeCifradoDto
        {
            IdCifrado = resultado.IdCifrado,
            MensajeCifradoTexto = resultado.MensajeCifradoTexto,
            Saltos = resultado.Saltos
        };
    }
} 