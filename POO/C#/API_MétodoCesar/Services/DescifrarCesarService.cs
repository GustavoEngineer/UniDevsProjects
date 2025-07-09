using System.Linq;

namespace WebAPI.Services
{
    public class DescifrarCesarService : IDescifrarCesarService
    {
        public string Descifrar(string texto, int desplazamiento)
        {
            if (string.IsNullOrEmpty(texto)) return texto;

            desplazamiento %= 26;

            char DescifrarChar(char c)
            {
                if (!char.IsLetter(c)) return c;

                char baseChar = char.IsUpper(c) ? 'A' : 'a';
                return (char)(((c - baseChar - desplazamiento + 26) % 26) + baseChar);
            }

            return new string(texto.Select(DescifrarChar).ToArray());
        }
    }
}
