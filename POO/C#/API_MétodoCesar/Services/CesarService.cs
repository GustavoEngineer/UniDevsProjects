using System.Linq;

namespace WebAPI.Services
{
    public class CesarService : ICesarService
    {
        public string Cifrar(string texto, int desplazamiento)
        {
            if (string.IsNullOrEmpty(texto)) return texto;

            desplazamiento %= 26;

            char CifrarChar(char c)
            {
                if (!char.IsLetter(c)) return c;

                char baseChar = char.IsUpper(c) ? 'A' : 'a';
                return (char)(((c - baseChar + desplazamiento + 26) % 26) + baseChar);
            }

            return new string(texto.Select(CifrarChar).ToArray());
        }
    }
}
