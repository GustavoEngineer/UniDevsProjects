using System;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        var mangas = await MangaDownloader.ObtenerMangasAsync();
        Console.WriteLine($"Total descargados: {mangas.Count}");
        MySQLSaver.GuardarMangas(mangas);
    }
}
