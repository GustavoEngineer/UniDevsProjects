using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Globalization;

public class Manga
{
    public string Nombre { get; set; }
    public string Autor { get; set; }
    public DateTime? Fecha_Publicacion { get; set; }
    public DateTime? Fecha_Emision { get; set; }
}

public class MangaDownloader
{
    public static async Task<List<Manga>> ObtenerMangasAsync(int maxMangas = 2000)
    {
        List<Manga> mangas = new List<Manga>();
        using HttpClient client = new HttpClient();

        for (int pagina = 1; mangas.Count < maxMangas; pagina++)
        {
            string url = $"https://api.jikan.moe/v4/manga?page={pagina}&limit=25";
            Console.WriteLine($"Obteniendo página {pagina}...");

            HttpResponseMessage response = await client.GetAsync(url);
            if (!response.IsSuccessStatusCode)
            {
                Console.WriteLine($"Error HTTP: {response.StatusCode}");
                continue;
            }

            string json = await response.Content.ReadAsStringAsync();
            RespuestaAPI resultado = JsonConvert.DeserializeObject<RespuestaAPI>(json);

            foreach (var m in resultado.data)
            {
                if (mangas.Count >= maxMangas)
                    break;

                DateTime? fechaPub = ParseFecha(m.published?.from);
                DateTime? fechaEmi = ParseFecha(m.published?.to);

                mangas.Add(new Manga
                {
                    Nombre = m.title ?? "Sin Título",
                    Autor = (m.authors != null && m.authors.Length > 0) ? m.authors[0].name : "Desconocido",
                    Fecha_Publicacion = fechaPub,
                    Fecha_Emision = fechaEmi
                });
            }

            await Task.Delay(1000); // Espera para no saturar la API
        }

        return mangas;
    }

    private static DateTime? ParseFecha(string fecha)
    {
        if (string.IsNullOrWhiteSpace(fecha)) return null;
        try
        {
            return DateTime.Parse(fecha, null, DateTimeStyles.AdjustToUniversal).Date;
        }
        catch
        {
            return null;
        }
    }
}
