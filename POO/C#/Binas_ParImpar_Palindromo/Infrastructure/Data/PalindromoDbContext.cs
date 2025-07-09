using Microsoft.EntityFrameworkCore;
using ProyectoBinas.Core.Entities;

namespace ProyectoBinas.Infrastructure.Data
{
    /// <summary>
    /// Contexto de Entity Framework para la base de datos de palíndromos y números
    /// </summary>
    public class PalindromoDbContext : DbContext
    {
        /// <summary>
        /// Constructor del contexto de base de datos
        /// </summary>
        /// <param name="options">Opciones de configuración del contexto</param>
        public PalindromoDbContext(DbContextOptions<PalindromoDbContext> options) : base(options)
        {
        }

        /// <summary>
        /// DbSet para la entidad Palindromo
        /// </summary>
        public DbSet<Palindromo> Palindromos { get; set; }

        /// <summary>
        /// DbSet para la entidad Numero
        /// </summary>
        public DbSet<Numero> Numeros { get; set; }

        /// <summary>
        /// Configura el modelo de datos al crear el contexto
        /// </summary>
        /// <param name="modelBuilder">Constructor del modelo</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuración de la entidad Palindromo
            modelBuilder.Entity<Palindromo>(entity =>
            {
                entity.HasKey(e => e.Palindromo_ID);
                entity.Property(e => e.Palindromo_ID).ValueGeneratedOnAdd();
                entity.Property(e => e.Palabra).IsRequired().HasMaxLength(100);
                entity.Property(e => e.EsPalindromo).IsRequired();
                entity.Property(e => e.FechaConsulta).IsRequired();
            });

            // Configuración de la entidad Numero
            modelBuilder.Entity<Numero>(entity =>
            {
                entity.HasKey(e => e.Consulta_ID);
                entity.Property(e => e.Consulta_ID).ValueGeneratedOnAdd();
                entity.Property(e => e.NumeroValor).IsRequired();
                entity.Property(e => e.EsPar).IsRequired();
                entity.Property(e => e.Fecha_Consulta).IsRequired();
            });
        }
    }
} 