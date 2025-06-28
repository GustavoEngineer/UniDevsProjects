namespace StarTrekDataGenerator.Models.DbModels
{
    // Tabla: Imperios
    public class Imperio
    {
        public int Imperio_ID { get; set; }
        public required string Nombre { get; set; }
        public double Temperatura_Promedio { get; set; }
    }

    // Tabla: Maniobras
    public class Maniobra
    {
        public int Maniobra_ID { get; set; }
        public required string Nombre_Maniobra { get; set; }
        public double Consumo_Energia { get; set; }
    }

    // Tabla: Flotas
    public class Flota
    {
        public int Flota_ID { get; set; }
        public required string Destino { get; set; }
        public int Misiones { get; set; }
        public int Nave_ID { get; set; } // Representative Ship (as per schema)
        public int Imperio_ID { get; set; }
    }

    // Tabla: Naves
    public class Nave
    {
        public int Nave_ID { get; set; }
        public required string Nombre { get; set; } // Adding Name for clarity, assuming it's the ship's name
        public double Velocidad_Max { get; set; }
        public double Energia_Acumulada { get; set; }
        public int Capitan_ID { get; set; }
        public int Flota_ID { get; set; } // Todas las naves deben pertenecer a una flota
    }

    // Tabla: Capitan
    public class Capitan
    {
        public int Capitan_ID { get; set; }
        public required string Nombre_Capitan { get; set; }
        public int Imperio_ID { get; set; }
        public int Planeta_ID { get; set; }
    }

    // Tabla: Montaña
    public class Montana
    {
        public int Montana_ID { get; set; }
        public required string Nombre_Montana { get; set; }
        public double Altura { get; set; }
    }

    // Tabla: Planeta
    public class Planeta
    {
        public int Planeta_ID { get; set; }
        public required string Nombre_Cientifico { get; set; }
        public required string Nombre_Vulgar { get; set; }
        public long Poblacion_Total { get; set; }
        public required string Coordenadas { get; set; }
        public int Montana_ID { get; set; }
        public int Imperio_ID { get; set; }
        // public int Raza_ID { get; set; } // Removed: handled by Planeta_Raza M:N table
    }

    // Tabla: Razas
    public class Raza
    {
        public int Raza_ID { get; set; }
        public required string Nombre_Raza { get; set; }
        // public int Planeta_ID { get; set; } // Removed: handled by Planeta_Raza M:N table
        public required string Habilidad_Principal { get; set; }
    }

    // Tabla: Planeta_Raza (Junction Table)
    public class PlanetaRaza
    {
        public int Planeta_ID { get; set; }
        public int Raza_ID { get; set; }
        public double Porcentaje_Poblacion { get; set; }
    }

    // Tabla: Nave_Maniobra (Junction Table)
    public class NaveManiobra
    {
        public int Nave_ID { get; set; }
        public int Maniobra_ID { get; set; }
    }
}