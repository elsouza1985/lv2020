using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace React_CoreNet.Models
{
    public partial class AppDbContext : DbContext
    {
        public AppDbContext()
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Cidades> Cidades { get; set; }
        public virtual DbSet<Contatos> Contatos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
//            if (!optionsBuilder.IsConfigured)
//            {
////#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
//                optionsBuilder.UseSqlServer("Data Source=localhost\\sqlexpress;Initial Catalog=ReactDB;Integrated Security=True");
//            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<Cidades>(entity =>
            {
                entity.HasKey(e => e.CidadeId);

                entity.Property(e => e.CidadeNome)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Contatos>(entity =>
            {
                entity.HasKey(e => e.ContatoId);

                entity.Property(e => e.Cidade)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(80);

                entity.Property(e => e.Sexo)
                    .IsRequired()
                    .HasMaxLength(20);
            });
        }
    }
}
