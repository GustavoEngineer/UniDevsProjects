using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace StarTrekDataGenerator.Services
{
    public class StapiClient
    {
        private readonly HttpClient _httpClient;
        private const string BaseUrl = "https://data.wikitrek.org/dt/api.php";

        public StapiClient()
        {
            _httpClient = new HttpClient();
        }

        // Obtiene una lista de páginas (pueden ser personajes, naves, planetas, etc.)
        public async Task<List<string>> GetAllPagesAsync(int limit = 10)
        {
            var url = $"{BaseUrl}?action=query&list=allpages&apnamespace=0&format=json&aplimit={limit}";
            var response = await _httpClient.GetStringAsync(url);
            dynamic? json = JsonConvert.DeserializeObject(response);
            var result = new List<string>();
            
            if (json?.query?.allpages != null)
            {
                foreach (var page in json.query.allpages)
                {
                    if (page?.title != null)
                    {
                        result.Add((string)page.title);
                    }
                }
            }
            return result;
        }

        // Ejemplo: obtener el extracto de una página específica
        public async Task<string?> GetPageExtractAsync(string title)
        {
            var url = $"{BaseUrl}?action=query&titles={Uri.EscapeDataString(title)}&prop=extracts&format=json&exintro=1";
            var response = await _httpClient.GetStringAsync(url);
            dynamic? json = JsonConvert.DeserializeObject(response);
            
            if (json?.query?.pages != null)
            {
                var pages = json.query.pages;
                foreach (var page in pages)
                {
                    if (page?.First?.extract != null)
                    {
                        return (string)page.First.extract;
                    }
                }
            }
            return null;
        }
    }
}