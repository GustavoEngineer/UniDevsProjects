namespace BinasCesar.Core.DTOs;

public class CrearMensajeDto
{
    public string MensajeOriginal { get; set; } = string.Empty;
    public int Desplazamiento { get; set; }
}

public class MensajeCifradoDto
{
    public int IdCifrado { get; set; }
    public string MensajeCifradoTexto { get; set; } = string.Empty;
    public int Saltos { get; set; }
}

public class MensajeCompletoDto
{
    public int IdCifrado { get; set; }
    public string MensajeCifradoTexto { get; set; } = string.Empty;
    public string MensajeDescifrado { get; set; } = string.Empty;
    public int Saltos { get; set; }
}

public class ActualizarMensajeDto
{
    public string MensajeOriginal { get; set; } = string.Empty;
    public int Desplazamiento { get; set; }
}

public class GuardarMensajeCifradoDto
{
    public string MensajeCifrado { get; set; } = string.Empty;
    public int Desplazamiento { get; set; }
} 