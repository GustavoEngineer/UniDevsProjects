public class RespuestaAPI
{
    public MangaAPI[] data { get; set; }
}

public class MangaAPI
{
    public string title { get; set; }
    public Author[] authors { get; set; }
    public Published published { get; set; }
}

public class Author
{
    public string name { get; set; }
}

public class Published
{
    public string from { get; set; } // Fecha_Publicacion
    public string to { get; set; }   // Fecha_Emision
}
