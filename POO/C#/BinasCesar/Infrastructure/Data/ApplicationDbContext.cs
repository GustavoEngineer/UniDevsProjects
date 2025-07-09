using BinasCesar.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace BinasCesar.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<MensajeCifrado> MensajesCifrados { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<MensajeCifrado>(entity =>
        {
            entity.HasKey(e => e.IdCifrado);
            entity.Property(e => e.IdCifrado).ValueGeneratedOnAdd();
            entity.Property(e => e.MensajeCifradoTexto).IsRequired();
            entity.Property(e => e.Saltos).IsRequired();
        });
    }
} 