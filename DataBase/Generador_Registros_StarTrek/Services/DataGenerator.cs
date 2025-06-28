using StarTrekDataGenerator.Models.DbModels;
using StarTrekDataGenerator.Models.StapiModels;
using StarTrekDataGenerator.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StarTrekDataGenerator.Services
{
    public class GeneratedData
    {
        public List<Imperio> Imperios { get; set; } = new List<Imperio>();
        public List<Maniobra> Maniobras { get; set; } = new List<Maniobra>();
        public List<Flota> Flotas { get; set; } = new List<Flota>();
        public List<Nave> Naves { get; set; } = new List<Nave>();
        public List<Capitan> Capitanes { get; set; } = new List<Capitan>();
        public List<Planeta> Planetas { get; set; } = new List<Planeta>();
        public List<Montana> Montanas { get; set; } = new List<Montana>();
        public List<Raza> Razas { get; set; } = new List<Raza>();
        public List<PlanetaRaza> PlanetasRazas { get; set; } = new List<PlanetaRaza>();
        public List<NaveManiobra> NavesManiobras { get; set; } = new List<NaveManiobra>();

        public int TotalRecords =>
            Imperios.Count + Maniobras.Count + Flotas.Count + Naves.Count +
            Capitanes.Count + Planetas.Count + Montanas.Count + Razas.Count +
            PlanetasRazas.Count + NavesManiobras.Count;
    }

    public class DataGenerator
    {
        private readonly StapiClient _stapiClient;
        private readonly Random _random = new Random();
        private GeneratedData _generatedData;

        // Keep track of IDs for generation
        private int _imperioIdCounter = 1;
        private int _maniobraIdCounter = 1;
        private int _flotaIdCounter = 1;
        private int _naveIdCounter = 1;
        private int _capitanIdCounter = 1;
        private int _planetaIdCounter = 1;
        private int _montanaIdCounter = 1;
        private int _razaIdCounter = 1;

        public DataGenerator(StapiClient stapiClient)
        {
            _stapiClient = stapiClient;
            _generatedData = new GeneratedData();
        }

        public GeneratedData GenerateStarTrekData(int targetTotalRecords = 700)
        {
            Console.WriteLine("Generando datos reales de Star Trek...");
            
            // Generar entidades base con datos reales de Star Trek
            GenerateImperios();
            GenerateMontanas();
            GenerateManiobras();
            GenerateRazas();

            // Generar entidades dependientes
            GeneratePlanetas();
            GenerateCapitanes();
            GenerateFlotas();
            GenerateNaves();
            GeneratePlanetasRazas();
            GenerateNavesManiobras();

            // Ajustar para alcanzar exactamente 700 registros
            AdjustToTargetRecords(targetTotalRecords);

            Console.WriteLine($"Datos generados exitosamente. Total de registros: {_generatedData.TotalRecords}");
            return _generatedData;
        }

        private void GenerateImperios()
        {
            // Imperios reales de Star Trek
            var imperios = new[]
            {
                new { Nombre = "Federación Unida de Planetas", Temperatura = 22.5 },
                new { Nombre = "Imperio Klingon", Temperatura = 35.2 },
                new { Nombre = "Imperio Romulano", Temperatura = 28.7 },
                new { Nombre = "Dominio", Temperatura = 42.1 },
                new { Nombre = "Colectivo Borg", Temperatura = 18.3 },
                new { Nombre = "Unión Cardassiana", Temperatura = 31.8 },
                new { Nombre = "Alianza Ferengi", Temperatura = 25.4 },
                new { Nombre = "Imperio Tholiano", Temperatura = 45.6 },
                new { Nombre = "Confederación Breen", Temperatura = -15.2 },
                new { Nombre = "Alianza Talaxiana", Temperatura = 26.8 },
                new { Nombre = "Imperio Sheliak", Temperatura = 38.9 },
                new { Nombre = "Coalición Tzenkethi", Temperatura = 33.1 },
                new { Nombre = "Imperio Gorn", Temperatura = 29.7 },
                new { Nombre = "Alianza Orion", Temperatura = 27.3 },
                new { Nombre = "Imperio Andoriano", Temperatura = 12.4 }
            };

            foreach (var imperio in imperios)
            {
                _generatedData.Imperios.Add(new Imperio
                {
                    Imperio_ID = _imperioIdCounter++,
                    Nombre = imperio.Nombre,
                    Temperatura_Promedio = imperio.Temperatura
                });
            }
        }

        private void GenerateManiobras()
        {
            // Maniobras reales de Star Trek
            var maniobras = new[]
            {
                new { Nombre = "Factor Warp 9.9", Consumo = 850.0 },
                new { Nombre = "Maniobra Picard", Consumo = 650.0 },
                new { Nombre = "Maniobra Riker", Consumo = 720.0 },
                new { Nombre = "Factor Warp 8.5", Consumo = 450.0 },
                new { Nombre = "Maniobra Evasiva Delta", Consumo = 380.0 },
                new { Nombre = "Factor Warp 7.2", Consumo = 320.0 },
                new { Nombre = "Maniobra de Combate Alfa", Consumo = 550.0 },
                new { Nombre = "Factor Warp 6.8", Consumo = 280.0 },
                new { Nombre = "Maniobra de Exploración", Consumo = 200.0 },
                new { Nombre = "Factor Warp 5.5", Consumo = 180.0 },
                new { Nombre = "Maniobra de Rescate", Consumo = 420.0 },
                new { Nombre = "Factor Warp 4.2", Consumo = 150.0 },
                new { Nombre = "Maniobra de Patrulla", Consumo = 120.0 },
                new { Nombre = "Factor Warp 3.8", Consumo = 100.0 },
                new { Nombre = "Maniobra de Diplomacia", Consumo = 80.0 }
            };

            foreach (var maniobra in maniobras)
            {
                _generatedData.Maniobras.Add(new Maniobra
                {
                    Maniobra_ID = _maniobraIdCounter++,
                    Nombre_Maniobra = maniobra.Nombre,
                    Consumo_Energia = maniobra.Consumo
                });
            }
        }

        private void GenerateMontanas()
        {
            // Montañas reales de Star Trek
            var montanas = new[]
            {
                new { Nombre = "Monte Seleya", Altura = 2847.0 },
                new { Nombre = "Monte Gol", Altura = 3156.0 },
                new { Nombre = "Pico de la Forja", Altura = 1892.0 },
                new { Nombre = "Monte Yosemite", Altura = 2695.0 },
                new { Nombre = "Pico del Amanecer", Altura = 3421.0 },
                new { Nombre = "Monte McKinley", Altura = 6194.0 },
                new { Nombre = "Pico del Crepúsculo", Altura = 2156.0 },
                new { Nombre = "Monte Everest", Altura = 8848.0 },
                new { Nombre = "Pico de la Libertad", Altura = 1789.0 },
                new { Nombre = "Monte Kilimanjaro", Altura = 5895.0 },
                new { Nombre = "Pico de la Esperanza", Altura = 2341.0 },
                new { Nombre = "Monte Fuji", Altura = 3776.0 },
                new { Nombre = "Pico de la Victoria", Altura = 1567.0 },
                new { Nombre = "Monte Blanc", Altura = 4808.0 },
                new { Nombre = "Pico de la Paz", Altura = 1987.0 }
            };

            foreach (var montana in montanas)
            {
                _generatedData.Montanas.Add(new Montana
                {
                    Montana_ID = _montanaIdCounter++,
                    Nombre_Montana = montana.Nombre,
                    Altura = montana.Altura
                });
            }
        }

        private void GenerateRazas()
        {
            // Razas reales de Star Trek
            var razas = new[]
            {
                new { Nombre = "Humanos", Habilidad = "Adaptabilidad" },
                new { Nombre = "Vulcanos", Habilidad = "Lógica" },
                new { Nombre = "Klingons", Habilidad = "Honor" },
                new { Nombre = "Romulanos", Habilidad = "Estrategia" },
                new { Nombre = "Andorianos", Habilidad = "Valentía" },
                new { Nombre = "Tellaritas", Habilidad = "Diplomacia" },
                new { Nombre = "Betazoides", Habilidad = "Telepatía" },
                new { Nombre = "Trill", Habilidad = "Simbiosis" },
                new { Nombre = "Bajoranos", Habilidad = "Fe" },
                new { Nombre = "Cardassianos", Habilidad = "Perseverancia" },
                new { Nombre = "Ferengi", Habilidad = "Comercio" },
                new { Nombre = "Breen", Habilidad = "Resistencia" },
                new { Nombre = "Jem'Hadar", Habilidad = "Lealtad" },
                new { Nombre = "Vorta", Habilidad = "Manipulación" },
                new { Nombre = "Founders", Habilidad = "Cambio de Forma" },
                new { Nombre = "Borg", Habilidad = "Asimilación" },
                new { Nombre = "Q", Habilidad = "Omnipotencia" },
                new { Nombre = "Talaxianos", Habilidad = "Optimismo" },
                new { Nombre = "Ocampas", Habilidad = "Intuición" },
                new { Nombre = "Kazon", Habilidad = "Supervivencia" }
            };

            foreach (var raza in razas)
            {
                _generatedData.Razas.Add(new Raza
                {
                    Raza_ID = _razaIdCounter++,
                    Nombre_Raza = raza.Nombre,
                    Habilidad_Principal = raza.Habilidad
                });
            }
        }

        private void GeneratePlanetas()
        {
            // Planetas reales de Star Trek
            var planetas = new[]
            {
                new { Cientifico = "Terra Prime", Vulgar = "Tierra", Poblacion = 10000000000L, Coordenadas = "0.0, 0.0, 0.0" },
                new { Cientifico = "Vulcanis", Vulgar = "Vulcano", Poblacion = 4500000000L, Coordenadas = "15.2, -8.7, 12.3" },
                new { Cientifico = "Qo'noS", Vulgar = "Kronos", Poblacion = 28000000000L, Coordenadas = "25.8, 18.4, -5.2" },
                new { Cientifico = "Romulus", Vulgar = "Romulus", Poblacion = 18000000000L, Coordenadas = "-12.5, 22.1, 8.9" },
                new { Cientifico = "Andoria", Vulgar = "Andoria", Poblacion = 8500000000L, Coordenadas = "8.7, -15.3, 19.6" },
                new { Cientifico = "Tellar Prime", Vulgar = "Tellar", Poblacion = 12000000000L, Coordenadas = "-18.9, 7.4, -12.8" },
                new { Cientifico = "Betazed", Vulgar = "Betazed", Poblacion = 6500000000L, Coordenadas = "32.1, -9.8, 15.7" },
                new { Cientifico = "Trillius Prime", Vulgar = "Trill", Poblacion = 5500000000L, Coordenadas = "-5.6, 28.3, -7.1" },
                new { Cientifico = "Bajor", Vulgar = "Bajor", Poblacion = 3800000000L, Coordenadas = "45.2, -22.7, 33.8" },
                new { Cientifico = "Cardassia Prime", Vulgar = "Cardassia", Poblacion = 22000000000L, Coordenadas = "-28.9, 16.5, -25.3" },
                new { Cientifico = "Ferenginar", Vulgar = "Ferenginar", Poblacion = 9500000000L, Coordenadas = "19.7, -31.2, 42.1" },
                new { Cientifico = "Breen", Vulgar = "Breen", Poblacion = 3200000000L, Coordenadas = "-55.8, 8.9, -38.7" },
                new { Cientifico = "Dominion Homeworld", Vulgar = "Dominion", Poblacion = 15000000000L, Coordenadas = "67.3, -45.1, 28.9" },
                new { Cientifico = "Talax", Vulgar = "Talax", Poblacion = 4200000000L, Coordenadas = "-12.8, 35.6, -18.9" },
                new { Cientifico = "Ocampa", Vulgar = "Ocampa", Poblacion = 1800000000L, Coordenadas = "78.9, -67.2, 55.4" }
            };

            foreach (var planeta in planetas)
            {
                // Verificar que no exista ya un planeta con este nombre científico
                var existePlaneta = _generatedData.Planetas.Any(p => p.Nombre_Cientifico == planeta.Cientifico);
                if (!existePlaneta)
                {
                    _generatedData.Planetas.Add(new Planeta
                    {
                        Planeta_ID = _planetaIdCounter++,
                        Nombre_Cientifico = planeta.Cientifico,
                        Nombre_Vulgar = planeta.Vulgar,
                        Poblacion_Total = planeta.Poblacion,
                        Coordenadas = planeta.Coordenadas,
                        Montana_ID = RandomData.GetRandomElement(_generatedData.Montanas).Montana_ID,
                        Imperio_ID = RandomData.GetRandomElement(_generatedData.Imperios).Imperio_ID
                    });
                }
            }
        }

        private void GenerateCapitanes()
        {
            // Capitanes reales de Star Trek
            var capitanes = new[]
            {
                new { Nombre = "Jean-Luc Picard", Imperio = "Federación Unida de Planetas" },
                new { Nombre = "James T. Kirk", Imperio = "Federación Unida de Planetas" },
                new { Nombre = "Kathryn Janeway", Imperio = "Federación Unida de Planetas" },
                new { Nombre = "Benjamin Sisko", Imperio = "Federación Unida de Planetas" },
                new { Nombre = "Jonathan Archer", Imperio = "Federación Unida de Planetas" },
                new { Nombre = "Christopher Pike", Imperio = "Federación Unida de Planetas" },
                new { Nombre = "William T. Riker", Imperio = "Federación Unida de Planetas" },
                new { Nombre = "Edward Jellico", Imperio = "Federación Unida de Planetas" },
                new { Nombre = "Rachel Garrett", Imperio = "Federación Unida de Planetas" },
                new { Nombre = "John Harriman", Imperio = "Federación Unida de Planetas" },
                new { Nombre = "Martok", Imperio = "Imperio Klingon" },
                new { Nombre = "Gowron", Imperio = "Imperio Klingon" },
                new { Nombre = "Kor", Imperio = "Imperio Klingon" },
                new { Nombre = "Kang", Imperio = "Imperio Klingon" },
                new { Nombre = "Koloth", Imperio = "Imperio Klingon" },
                new { Nombre = "Shinzon", Imperio = "Imperio Romulano" },
                new { Nombre = "Neral", Imperio = "Imperio Romulano" },
                new { Nombre = "Tomalak", Imperio = "Imperio Romulano" },
                new { Nombre = "Sela", Imperio = "Imperio Romulano" },
                new { Nombre = "Dukat", Imperio = "Unión Cardassiana" },
                new { Nombre = "Damar", Imperio = "Unión Cardassiana" },
                new { Nombre = "Gul Evek", Imperio = "Unión Cardassiana" },
                new { Nombre = "Quark", Imperio = "Alianza Ferengi" },
                new { Nombre = "Zek", Imperio = "Alianza Ferengi" },
                new { Nombre = "Brunt", Imperio = "Alianza Ferengi" },
                new { Nombre = "Weyoun", Imperio = "Dominio" },
                new { Nombre = "Female Changeling", Imperio = "Dominio" },
                new { Nombre = "Locutus", Imperio = "Colectivo Borg" },
                new { Nombre = "Seven of Nine", Imperio = "Colectivo Borg" }
            };

            foreach (var capitan in capitanes)
            {
                var imperio = _generatedData.Imperios.FirstOrDefault(i => i.Nombre == capitan.Imperio);
                if (imperio != null)
                {
                    _generatedData.Capitanes.Add(new Capitan
                    {
                        Capitan_ID = _capitanIdCounter++,
                        Nombre_Capitan = capitan.Nombre,
                        Imperio_ID = imperio.Imperio_ID,
                        Planeta_ID = RandomData.GetRandomElement(_generatedData.Planetas).Planeta_ID
                    });
                }
            }
        }

        private void GenerateFlotas()
        {
            // Flotas reales de Star Trek
            var flotas = new[]
            {
                new { Destino = "Cuadrante Alfa", Misiones = 45 },
                new { Destino = "Cuadrante Beta", Misiones = 38 },
                new { Destino = "Cuadrante Gamma", Misiones = 52 },
                new { Destino = "Cuadrante Delta", Misiones = 67 },
                new { Destino = "Espacio Neutral", Misiones = 29 },
                new { Destino = "Zona Desmilitarizada", Misiones = 33 },
                new { Destino = "Territorio No Cartografiado", Misiones = 41 },
                new { Destino = "Núcleo Galáctico", Misiones = 15 },
                new { Destino = "Borde Exterior", Misiones = 58 },
                new { Destino = "Región de Badlands", Misiones = 22 },
                new { Destino = "Cúmulo de Bajor", Misiones = 36 },
                new { Destino = "Sector 001", Misiones = 12 },
                new { Destino = "Sector 002", Misiones = 18 },
                new { Destino = "Sector 003", Misiones = 25 },
                new { Destino = "Sector 004", Misiones = 31 }
            };

            foreach (var flota in flotas)
            {
                _generatedData.Flotas.Add(new Flota
                {
                    Flota_ID = _flotaIdCounter++,
                    Destino = flota.Destino,
                    Misiones = flota.Misiones,
                    Imperio_ID = RandomData.GetRandomElement(_generatedData.Imperios).Imperio_ID,
                    Nave_ID = 0 // Se actualizará después de generar las naves
                });
            }
        }

        private void GenerateNaves()
        {
            // Naves reales de Star Trek
            var naves = new[]
            {
                new { Nombre = "USS Enterprise NCC-1701", Velocidad = 9.2, Energia = 45000.0 },
                new { Nombre = "USS Enterprise NCC-1701-D", Velocidad = 9.6, Energia = 52000.0 },
                new { Nombre = "USS Enterprise NCC-1701-E", Velocidad = 9.8, Energia = 58000.0 },
                new { Nombre = "USS Voyager NCC-74656", Velocidad = 9.975, Energia = 48000.0 },
                new { Nombre = "USS Defiant NX-74205", Velocidad = 9.5, Energia = 35000.0 },
                new { Nombre = "USS Discovery NCC-1031", Velocidad = 9.1, Energia = 42000.0 },
                new { Nombre = "USS Enterprise NCC-1701-A", Velocidad = 9.3, Energia = 46000.0 },
                new { Nombre = "USS Enterprise NCC-1701-B", Velocidad = 9.4, Energia = 47000.0 },
                new { Nombre = "USS Enterprise NCC-1701-C", Velocidad = 9.5, Energia = 48000.0 },
                new { Nombre = "USS Reliant NCC-1864", Velocidad = 8.5, Energia = 38000.0 },
                new { Nombre = "USS Excelsior NCC-2000", Velocidad = 9.0, Energia = 41000.0 },
                new { Nombre = "USS Stargazer NCC-2893", Velocidad = 8.8, Energia = 39000.0 },
                new { Nombre = "USS Titan NCC-80102", Velocidad = 9.7, Energia = 54000.0 },
                new { Nombre = "USS Cerritos NCC-75567", Velocidad = 8.2, Energia = 32000.0 },
                new { Nombre = "USS Protostar NCC-76884", Velocidad = 9.9, Energia = 60000.0 },
                new { Nombre = "IKS Bortas", Velocidad = 9.3, Energia = 44000.0 },
                new { Nombre = "IKS Negh'Var", Velocidad = 9.4, Energia = 46000.0 },
                new { Nombre = "IKS Rotarran", Velocidad = 9.1, Energia = 42000.0 },
                new { Nombre = "IKS Pagh", Velocidad = 8.9, Energia = 40000.0 },
                new { Nombre = "IKS T'Ong", Velocidad = 9.2, Energia = 43000.0 },
                new { Nombre = "IRW Khazara", Velocidad = 9.5, Energia = 47000.0 },
                new { Nombre = "IRW Valdore", Velocidad = 9.6, Energia = 49000.0 },
                new { Nombre = "IRW Terix", Velocidad = 9.3, Energia = 45000.0 },
                new { Nombre = "IRW Decius", Velocidad = 9.4, Energia = 46000.0 },
                new { Nombre = "IRW Haakona", Velocidad = 9.2, Energia = 44000.0 },
                new { Nombre = "GCS Kumari", Velocidad = 9.1, Energia = 42000.0 },
                new { Nombre = "GCS Kumari II", Velocidad = 9.0, Energia = 41000.0 },
                new { Nombre = "GCS Kumari III", Velocidad = 8.9, Energia = 40000.0 },
                new { Nombre = "GCS Kumari IV", Velocidad = 8.8, Energia = 39000.0 },
                new { Nombre = "GCS Kumari V", Velocidad = 8.7, Energia = 38000.0 },
                new { Nombre = "USS Constitution NCC-1700", Velocidad = 8.6, Energia = 37000.0 },
                new { Nombre = "USS Constellation NCC-1017", Velocidad = 8.5, Energia = 36000.0 },
                new { Nombre = "USS Potemkin NCC-1657", Velocidad = 8.4, Energia = 35000.0 },
                new { Nombre = "USS Hood NCC-42296", Velocidad = 8.3, Energia = 34000.0 },
                new { Nombre = "USS Repulse NCC-2544", Velocidad = 8.2, Energia = 33000.0 },
                new { Nombre = "USS Lexington NCC-1709", Velocidad = 8.1, Energia = 32000.0 },
                new { Nombre = "USS Yorktown NCC-1717", Velocidad = 8.0, Energia = 31000.0 },
                new { Nombre = "USS Saratoga NCC-1887", Velocidad = 7.9, Energia = 30000.0 },
                new { Nombre = "USS Intrepid NCC-1631", Velocidad = 7.8, Energia = 29000.0 },
                new { Nombre = "USS Farragut NCC-1647", Velocidad = 7.7, Energia = 28000.0 },
                new { Nombre = "USS Excalibur NCC-1664", Velocidad = 7.6, Energia = 27000.0 },
                new { Nombre = "USS Exeter NCC-1672", Velocidad = 7.5, Energia = 26000.0 },
                new { Nombre = "USS Defiant NCC-1764", Velocidad = 7.4, Energia = 25000.0 },
                new { Nombre = "USS Valiant NCC-1621", Velocidad = 7.3, Energia = 24000.0 },
                new { Nombre = "USS Eagle NCC-956", Velocidad = 7.2, Energia = 23000.0 },
                new { Nombre = "USS Kongo NCC-1710", Velocidad = 7.1, Energia = 22000.0 },
                new { Nombre = "USS Republic NCC-1371", Velocidad = 7.0, Energia = 21000.0 },
                new { Nombre = "USS Hornet NCC-45231", Velocidad = 6.9, Energia = 20000.0 },
                new { Nombre = "USS Wasp NCC-18", Velocidad = 6.8, Energia = 19000.0 },
                new { Nombre = "USS Ranger NCC-1704", Velocidad = 6.7, Energia = 18000.0 },
                new { Nombre = "USS Enterprise NCC-1701-F", Velocidad = 9.95, Energia = 65000.0 },
                new { Nombre = "USS Enterprise NCC-1701-G", Velocidad = 9.98, Energia = 70000.0 }
            };

            foreach (var nave in naves)
            {
                _generatedData.Naves.Add(new Nave
                {
                    Nave_ID = _naveIdCounter++,
                    Nombre = nave.Nombre,
                    Velocidad_Max = nave.Velocidad,
                    Energia_Acumulada = nave.Energia,
                    Capitan_ID = RandomData.GetRandomElement(_generatedData.Capitanes).Capitan_ID,
                    Flota_ID = RandomData.GetRandomElement(_generatedData.Flotas).Flota_ID
                });
            }

            // Actualizar las flotas con naves representativas
            foreach (var flota in _generatedData.Flotas)
            {
                if (flota.Nave_ID == 0 && _generatedData.Naves.Any())
                {
                    flota.Nave_ID = RandomData.GetRandomElement(_generatedData.Naves).Nave_ID;
                }
            }
        }

        private void GeneratePlanetasRazas()
        {
            // Generar relaciones planeta-raza basadas en datos reales de Star Trek
            var relaciones = new[]
            {
                new { Planeta = "Terra Prime", Raza = "Humanos", Porcentaje = 95.0 },
                new { Planeta = "Vulcanis", Raza = "Vulcanos", Porcentaje = 98.0 },
                new { Planeta = "Qo'noS", Raza = "Klingons", Porcentaje = 97.0 },
                new { Planeta = "Romulus", Raza = "Romulanos", Porcentaje = 96.0 },
                new { Planeta = "Andoria", Raza = "Andorianos", Porcentaje = 94.0 },
                new { Planeta = "Tellar Prime", Raza = "Tellaritas", Porcentaje = 93.0 },
                new { Planeta = "Betazed", Raza = "Betazoides", Porcentaje = 95.0 },
                new { Planeta = "Trillius Prime", Raza = "Trill", Porcentaje = 92.0 },
                new { Planeta = "Bajor", Raza = "Bajoranos", Porcentaje = 89.0 },
                new { Planeta = "Cardassia Prime", Raza = "Cardassianos", Porcentaje = 91.0 },
                new { Planeta = "Ferenginar", Raza = "Ferengi", Porcentaje = 88.0 },
                new { Planeta = "Breen", Raza = "Breen", Porcentaje = 87.0 },
                new { Planeta = "Dominion Homeworld", Raza = "Founders", Porcentaje = 85.0 },
                new { Planeta = "Talax", Raza = "Talaxianos", Porcentaje = 90.0 },
                new { Planeta = "Ocampa", Raza = "Ocampas", Porcentaje = 86.0 }
            };

            foreach (var relacion in relaciones)
            {
                var planeta = _generatedData.Planetas.FirstOrDefault(p => p.Nombre_Vulgar == relacion.Planeta);
                var raza = _generatedData.Razas.FirstOrDefault(r => r.Nombre_Raza == relacion.Raza);
                
                if (planeta != null && raza != null)
                {
                    _generatedData.PlanetasRazas.Add(new PlanetaRaza
                    {
                        Planeta_ID = planeta.Planeta_ID,
                        Raza_ID = raza.Raza_ID,
                        Porcentaje_Poblacion = relacion.Porcentaje
                    });
                }
            }
        }

        private void GenerateNavesManiobras()
        {
            // Generar relaciones nave-maniobra: cada nave puede tener múltiples maniobras
            foreach (var nave in _generatedData.Naves)
            {
                // Cada nave tendrá entre 1 y 3 maniobras aleatorias
                int numManiobras = _random.Next(1, 4);
                var maniobrasDisponibles = _generatedData.Maniobras.ToList();
                
                for (int i = 0; i < numManiobras && maniobrasDisponibles.Count > 0; i++)
                {
                    var maniobra = RandomData.GetRandomElement(maniobrasDisponibles);
                    maniobrasDisponibles.Remove(maniobra); // Evitar duplicados
                    
                    _generatedData.NavesManiobras.Add(new NaveManiobra
                    {
                        Nave_ID = nave.Nave_ID,
                        Maniobra_ID = maniobra.Maniobra_ID
                    });
                }
            }
        }

        private void AdjustToTargetRecords(int targetTotalRecords)
        {
            Console.WriteLine($"Ajustando registros para alcanzar exactamente {targetTotalRecords}...");
            
            while (_generatedData.TotalRecords != targetTotalRecords)
            {
                int registrosExcedentes = _generatedData.TotalRecords - targetTotalRecords;
                
                if (registrosExcedentes < 0)
                {
                    // Necesitamos más registros
                    if (_generatedData.NavesManiobras.Count < 200)
                    {
                        GenerateMoreNavesManiobras(Math.Abs(registrosExcedentes));
                    }
                    else if (_generatedData.PlanetasRazas.Count < 100)
                    {
                        GenerateMorePlanetasRazas(Math.Abs(registrosExcedentes));
                    }
                    else if (_generatedData.Naves.Count < 80)
                    {
                        GenerateMoreNaves(Math.Abs(registrosExcedentes));
                    }
                    else if (_generatedData.Capitanes.Count < 60)
                    {
                        GenerateMoreCapitanes(Math.Abs(registrosExcedentes));
                    }
                    else if (_generatedData.Planetas.Count < 50)
                    {
                        GenerateMorePlanetas(Math.Abs(registrosExcedentes));
                    }
                    else
                    {
                        // Si no podemos generar más de ninguna tabla, generar más relaciones nave-maniobra
                        GenerateMoreNavesManiobras(Math.Abs(registrosExcedentes));
                    }
                }
                else
                {
                    // Tenemos demasiados registros, eliminar de las tablas más grandes
                    if (_generatedData.NavesManiobras.Count > 50)
                    {
                        int aEliminar = Math.Min(registrosExcedentes, _generatedData.NavesManiobras.Count - 50);
                        for (int i = 0; i < aEliminar; i++)
                        {
                            _generatedData.NavesManiobras.RemoveAt(_generatedData.NavesManiobras.Count - 1);
                        }
                    }
                    else if (_generatedData.PlanetasRazas.Count > 30)
                    {
                        int aEliminar = Math.Min(registrosExcedentes, _generatedData.PlanetasRazas.Count - 30);
                        for (int i = 0; i < aEliminar; i++)
                        {
                            _generatedData.PlanetasRazas.RemoveAt(_generatedData.PlanetasRazas.Count - 1);
                        }
                    }
                    else if (_generatedData.Naves.Count > 60)
                    {
                        int aEliminar = Math.Min(registrosExcedentes, _generatedData.Naves.Count - 60);
                        for (int i = 0; i < aEliminar; i++)
                        {
                            _generatedData.Naves.RemoveAt(_generatedData.Naves.Count - 1);
                        }
                    }
                    else if (_generatedData.Planetas.Count > 40)
                    {
                        int aEliminar = Math.Min(registrosExcedentes, _generatedData.Planetas.Count - 40);
                        for (int i = 0; i < aEliminar; i++)
                        {
                            _generatedData.Planetas.RemoveAt(_generatedData.Planetas.Count - 1);
                        }
                    }
                    else
                    {
                        break; // Evitar bucle infinito
                    }
                }
            }
            
            Console.WriteLine($"Registros finales: {_generatedData.TotalRecords}");
        }

        private void GenerateMorePlanetasRazas(int cantidad)
        {
            var planetasDisponibles = _generatedData.Planetas.ToList();
            var razasDisponibles = _generatedData.Razas.ToList();
            
            for (int i = 0; i < cantidad && _generatedData.TotalRecords < 700; i++)
            {
                var planeta = RandomData.GetRandomElement(planetasDisponibles);
                var raza = RandomData.GetRandomElement(razasDisponibles);
                
                // Verificar que no exista ya esta relación
                var existeRelacion = _generatedData.PlanetasRazas.Any(pr => 
                    pr.Planeta_ID == planeta.Planeta_ID && pr.Raza_ID == raza.Raza_ID);
                
                if (!existeRelacion)
                {
                    _generatedData.PlanetasRazas.Add(new PlanetaRaza
                    {
                        Planeta_ID = planeta.Planeta_ID,
                        Raza_ID = raza.Raza_ID,
                        Porcentaje_Poblacion = RandomData.GetRandomDouble(10.0, 95.0)
                    });
                }
            }
        }

        private void GenerateMoreNaves(int cantidad)
        {
            var nombresNaves = new[]
            {
                "USS Discovery NCC-1031", "USS Shenzhou NCC-1227", "USS Europa NCC-1648",
                "USS T'Kumbra NCC-62100", "USS Sutherland NCC-72015", "USS Hood NCC-42296",
                "USS Repulse NCC-2544", "USS Lexington NCC-1709", "USS Yorktown NCC-1717",
                "USS Saratoga NCC-1887", "USS Intrepid NCC-1631", "USS Farragut NCC-1647",
                "USS Excalibur NCC-1664", "USS Exeter NCC-1672", "USS Defiant NCC-1764",
                "USS Valiant NCC-1621", "USS Eagle NCC-956", "USS Kongo NCC-1710",
                "USS Republic NCC-1371", "USS Hornet NCC-45231", "USS Wasp NCC-18",
                "USS Ranger NCC-1704", "USS Enterprise NCC-1701-F", "USS Enterprise NCC-1701-G",
                "IKS Rotarran NCC-62395", "IKS Pagh NCC-64932", "IKS T'Ong NCC-64933",
                "IRW Khazara NCC-62100", "IRW Valdore NCC-62101", "IRW Terix NCC-62102",
                "IRW Decius NCC-62103", "IRW Haakona NCC-62104", "GCS Kumari NCC-1650",
                "GCS Kumari II NCC-1651", "GCS Kumari III NCC-1652", "GCS Kumari IV NCC-1653",
                "GCS Kumari V NCC-1654", "USS Constitution NCC-1700", "USS Constellation NCC-1017",
                "USS Potemkin NCC-1657", "USS Hood NCC-42296", "USS Repulse NCC-2544",
                "USS Lexington NCC-1709", "USS Yorktown NCC-1717", "USS Saratoga NCC-1887",
                "USS Intrepid NCC-1631", "USS Farragut NCC-1647", "USS Excalibur NCC-1664",
                "USS Exeter NCC-1672", "USS Defiant NCC-1764", "USS Valiant NCC-1621",
                "USS Eagle NCC-956", "USS Kongo NCC-1710", "USS Republic NCC-1371",
                "USS Hornet NCC-45231", "USS Wasp NCC-18", "USS Ranger NCC-1704"
            };

            for (int i = 0; i < cantidad && _generatedData.TotalRecords < 700; i++)
            {
                string nombreNave;
                if ((_naveIdCounter - 1) < nombresNaves.Length)
                {
                    nombreNave = nombresNaves[_naveIdCounter - 1];
                }
                else
                {
                    nombreNave = $"USS Ship NCC-{10000 + _naveIdCounter}";
                }

                // Verificar que no exista ya una nave con este nombre
                var existeNave = _generatedData.Naves.Any(n => n.Nombre == nombreNave);
                if (existeNave)
                {
                    nombreNave = $"USS Ship NCC-{10000 + _naveIdCounter}-{Guid.NewGuid().ToString().Substring(0, 4)}";
                }

                _generatedData.Naves.Add(new Nave
                {
                    Nave_ID = _naveIdCounter++,
                    Nombre = nombreNave,
                    Velocidad_Max = RandomData.GetRandomDouble(6.0, 9.9),
                    Energia_Acumulada = RandomData.GetRandomDouble(20000.0, 70000.0),
                    Capitan_ID = RandomData.GetRandomElement(_generatedData.Capitanes).Capitan_ID,
                    Flota_ID = RandomData.GetRandomElement(_generatedData.Flotas).Flota_ID
                });
            }
        }

        private void GenerateMoreCapitanes(int cantidad)
        {
            var nombresCapitanes = new[]
            {
                "Robert DeSoto", "Donald Varley", "Walker Keel", "Tryla Scott", "Rixx",
                "Klag", "Korath", "Kurn", "Lursa", "B'Etor", "Duras", "Gowron", "Martok",
                "Kor", "Kang", "Koloth", "Shinzon", "Neral", "Tomalak", "Sela", "Dukat",
                "Damar", "Gul Evek", "Quark", "Zek", "Brunt", "Weyoun", "Female Changeling",
                "Locutus", "Seven of Nine", "Hugh", "Unimatrix Zero", "Borg Queen",
                "Q", "Q2", "Female Q", "Amanda Rogers", "Vash", "Guinan", "Lwaxana Troi",
                "Kes", "Neelix", "Chakotay", "Tuvok", "B'Elanna Torres", "Tom Paris",
                "Harry Kim", "The Doctor", "Seven of Nine", "Icheb", "Naomi Wildman"
            };

            for (int i = 0; i < cantidad && _generatedData.TotalRecords < 700; i++)
            {
                var nombreCapitan = nombresCapitanes[_capitanIdCounter - 1];
                if (_capitanIdCounter - 1 >= nombresCapitanes.Length)
                {
                    nombreCapitan = $"Captain {_capitanIdCounter}";
                }

                var imperio = RandomData.GetRandomElement(_generatedData.Imperios);
                var planeta = RandomData.GetRandomElement(_generatedData.Planetas);

                _generatedData.Capitanes.Add(new Capitan
                {
                    Capitan_ID = _capitanIdCounter++,
                    Nombre_Capitan = nombreCapitan,
                    Imperio_ID = imperio.Imperio_ID,
                    Planeta_ID = planeta.Planeta_ID
                });
            }
        }

        private void GenerateMorePlanetas(int cantidad)
        {
            var nombresCientificos = new[]
            {
                "Alpha Centauri Prime", "Beta Hydri IV", "Gamma Trianguli VI", "Delta Eridani II",
                "Epsilon Indi III", "Zeta Reticuli Prime", "Eta Cassiopeiae V", "Theta Cygni VII",
                "Iota Draconis IV", "Kappa Andromedae III", "Lambda Serpentis II", "Mu Arae V",
                "Nu Draconis VI", "Xi Bootis IV", "Omicron Eridani III", "Pi Mensae II",
                "Rho Coronae Borealis V", "Sigma Draconis IV", "Tau Ceti III", "Upsilon Andromedae VI",
                "Phi Eridani II", "Chi Draconis V", "Psi Serpentis IV", "Omega Centauri III",
                "HD 209458 b", "HD 189733 b", "Kepler-186f", "Kepler-442b", "Kepler-452b",
                "TRAPPIST-1e", "TRAPPIST-1f", "TRAPPIST-1g", "Proxima Centauri b", "Barnard's Star b",
                "Wolf 1061c", "Gliese 667Cc", "Gliese 581g", "Gliese 581d", "Gliese 581c",
                "Gliese 581b", "Gliese 876d", "Gliese 876c", "Gliese 876b", "55 Cancri e",
                "55 Cancri b", "55 Cancri c", "55 Cancri d", "55 Cancri f", "Upsilon Andromedae b",
                "Upsilon Andromedae c", "Upsilon Andromedae d", "Upsilon Andromedae e"
            };

            var nombresVulgares = new[]
            {
                "Nueva Tierra", "Vulcano II", "Kronos Beta", "Romulus Secundus", "Andoria Nova",
                "Tellar Prime II", "Betazed Alpha", "Trillius Beta", "Bajor Secundus", "Cardassia Nova",
                "Ferenginar Beta", "Breen Alpha", "Dominion Secundus", "Talax Nova", "Ocampa Beta",
                "Kazon Prime", "Vidiian Alpha", "Hirogen Beta", "Species 8472 Prime", "Borg Alpha",
                "Q Continuum Beta", "Voth Prime", "Vaadwaur Alpha", "Krenim Beta", "Mokra Prime",
                "Kazon Alpha", "Trabe Beta", "Vidiian Prime", "Hirogen Alpha", "Species 8472 Beta",
                "Borg Prime", "Q Continuum Alpha", "Voth Beta", "Vaadwaur Prime", "Krenim Alpha",
                "Mokra Beta", "Kazon Secundus", "Trabe Alpha", "Vidiian Beta", "Hirogen Prime",
                "Species 8472 Alpha", "Borg Beta", "Q Continuum Secundus", "Voth Alpha", "Vaadwaur Beta"
            };

            for (int i = 0; i < cantidad && _generatedData.TotalRecords < 700; i++)
            {
                var nombreCientifico = nombresCientificos[_planetaIdCounter - 1];
                var nombreVulgar = nombresVulgares[_planetaIdCounter - 1];
                
                if (_planetaIdCounter - 1 >= nombresCientificos.Length)
                {
                    nombreCientifico = $"Planet {_planetaIdCounter}";
                    nombreVulgar = $"Planeta {_planetaIdCounter}";
                }

                // Verificar que no exista ya un planeta con este nombre científico
                var existePlaneta = _generatedData.Planetas.Any(p => p.Nombre_Cientifico == nombreCientifico);
                if (!existePlaneta)
                {
                    _generatedData.Planetas.Add(new Planeta
                    {
                        Planeta_ID = _planetaIdCounter++,
                        Nombre_Cientifico = nombreCientifico,
                        Nombre_Vulgar = nombreVulgar,
                        Poblacion_Total = RandomData.GetRandomLong(1000000, 50000000000),
                        Coordenadas = $"{RandomData.GetRandomDouble(-100, 100):F1}, {RandomData.GetRandomDouble(-100, 100):F1}, {RandomData.GetRandomDouble(-100, 100):F1}",
                        Montana_ID = RandomData.GetRandomElement(_generatedData.Montanas).Montana_ID,
                        Imperio_ID = RandomData.GetRandomElement(_generatedData.Imperios).Imperio_ID
                    });
                }
            }
        }

        private void GenerateMoreNavesManiobras(int cantidad)
        {
            var navesDisponibles = _generatedData.Naves.ToList();
            var maniobrasDisponibles = _generatedData.Maniobras.ToList();
            
            for (int i = 0; i < cantidad && _generatedData.TotalRecords < 700; i++)
            {
                var nave = RandomData.GetRandomElement(navesDisponibles);
                var maniobra = RandomData.GetRandomElement(maniobrasDisponibles);
                
                // Verificar que no exista ya esta relación
                var existeRelacion = _generatedData.NavesManiobras.Any(nm => 
                    nm.Nave_ID == nave.Nave_ID && nm.Maniobra_ID == maniobra.Maniobra_ID);
                
                if (!existeRelacion)
                {
                    _generatedData.NavesManiobras.Add(new NaveManiobra
                    {
                        Nave_ID = nave.Nave_ID,
                        Maniobra_ID = maniobra.Maniobra_ID
                    });
                }
            }
        }
    }
}