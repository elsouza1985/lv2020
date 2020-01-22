using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Lucra2020.Models
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

        public virtual DbSet<TbBairBairro> TbBairBairro { get; set; }
        public virtual DbSet<TbClieCliente> TbClieCliente { get; set; }
        public virtual DbSet<TbEstbEstabelecimento> TbEstbEstabelecimento { get; set; }
        public virtual DbSet<TbMuniMunicipio> TbMuniMunicipio { get; set; }
        public virtual DbSet<vwCliente> VwCliente { get; set; }
        public virtual DbSet<vwUsuario> VwUsuario { get; set; }
        public virtual DbSet<vwAgenda> VwAgenda { get; set; }
        public virtual DbSet<vwProdutoEstabelecimento> ProdutoEstabelecimento { get; set; }
        public virtual DbSet<vwProduto> Produto { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
//            if (!optionsBuilder.IsConfigured)
//            {
////#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
//                optionsBuilder.UseSqlServer("Data Source=Localhost;Initial Catalog=TR_ValorNove;Integrated Security=True");
//            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<TbBairBairro>(entity =>
            {
                entity.HasKey(e => e.BairIdtBairro)
                    .HasName("ct_bair_p");

                entity.ToTable("tb_bair_bairro");

                entity.HasIndex(e => e.MuniIdtMunicipio)
                    .HasName("idx_bair_01");

                entity.HasIndex(e => new { e.MuniIdtMunicipio, e.BairNomBairro })
                    .HasName("ct_bair_unq_01")
                    .IsUnique();

                entity.Property(e => e.BairIdtBairro).HasColumnName("bair_idt_bairro");

                entity.Property(e => e.BairNomBairro)
                    .IsRequired()
                    .HasColumnName("bair_nom_bairro")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.MuniIdtMunicipio).HasColumnName("muni_idt_municipio");

                entity.HasOne(d => d.MuniIdtMunicipioNavigation)
                    .WithMany(p => p.TbBairBairro)
                    .HasForeignKey(d => d.MuniIdtMunicipio)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("ct_bair_muni_f");
            });

            modelBuilder.Entity<TbClieCliente>(entity =>
            {
                entity.HasKey(e => e.ClieIdtCliente)
                    .HasName("ct_clie_p");

                entity.ToTable("tb_clie_cliente");

                entity.HasIndex(e => e.EstbIdtEstabelecimento)
                    .HasName("idx_clie_01");

                entity.HasIndex(e => new { e.ClieNomCliente, e.ClieNumDdd, e.ClieNumTelefone, e.EstbIdtEstabelecimento })
                    .HasName("ct_clie_unq_01")
                    .IsUnique();

                entity.Property(e => e.ClieIdtCliente).HasColumnName("clie_idt_cliente");

                entity.Property(e => e.ClieBitAtivo)
                    .IsRequired()
                    .HasColumnName("clie_bit_ativo")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.ClieDatNascimento)
                    .HasColumnName("clie_dat_nascimento")
                    .HasColumnType("date");

                entity.Property(e => e.ClieDthCadastro)
                    .HasColumnName("clie_dth_cadastro")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ClieDthDesativacao)
                    .HasColumnName("clie_dth_desativacao")
                    .HasColumnType("datetime");

                entity.Property(e => e.ClieNomCliente)
                    .IsRequired()
                    .HasColumnName("clie_nom_cliente")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ClieNumCpf).HasColumnName("clie_num_cpf");

                entity.Property(e => e.ClieNumDdd).HasColumnName("clie_num_ddd");

                entity.Property(e => e.ClieNumTelefone).HasColumnName("clie_num_telefone");

                entity.Property(e => e.ClieTxtEmail)
                    .HasColumnName("clie_txt_email")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ClieUidCliente).HasColumnName("clie_uid_cliente");

                entity.Property(e => e.EstbIdtEstabelecimento).HasColumnName("estb_idt_estabelecimento");

                entity.HasOne(d => d.EstbIdtEstabelecimentoNavigation)
                    .WithMany(p => p.TbClieCliente)
                    .HasForeignKey(d => d.EstbIdtEstabelecimento)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("ct_clie_estb_f");
            });

            modelBuilder.Entity<TbEstbEstabelecimento>(entity =>
            {
                entity.HasKey(e => e.EstbIdtEstabelecimento)
                    .HasName("ct_estb_p");

                entity.ToTable("tb_estb_estabelecimento");

                entity.HasIndex(e => e.BairIdtBairro)
                    .HasName("idx_estb_02");

                entity.HasIndex(e => e.EstbNumCpfCnpj)
                    .HasName("ct_estb_unq_01")
                    .IsUnique();

                entity.HasIndex(e => e.MuniIdtMunicipio)
                    .HasName("idx_estb_01");

                entity.Property(e => e.EstbIdtEstabelecimento).HasColumnName("estb_idt_estabelecimento");

                entity.Property(e => e.BairIdtBairro).HasColumnName("bair_idt_bairro");

                entity.Property(e => e.EstbBitAtivo)
                    .IsRequired()
                    .HasColumnName("estb_bit_ativo")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.EstbCodTipoDocumento)
                    .IsRequired()
                    .HasColumnName("estb_cod_tipo_documento")
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.EstbDthCadastro)
                    .HasColumnName("estb_dth_cadastro")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.EstbDthDesativacao)
                    .HasColumnName("estb_dth_desativacao")
                    .HasColumnType("datetime");

                entity.Property(e => e.EstbNomEstabelecimento)
                    .IsRequired()
                    .HasColumnName("estb_nom_estabelecimento")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.EstbNumCep).HasColumnName("estb_num_cep");

                entity.Property(e => e.EstbNumCpfCnpj).HasColumnName("estb_num_cpf_cnpj");

                entity.Property(e => e.EstbTxtEndereco)
                    .IsRequired()
                    .HasColumnName("estb_txt_endereco")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.EstbTxtEnderecoComplemento)
                    .HasColumnName("estb_txt_endereco_complemento")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.EstbTxtEnderecoNumero)
                    .IsRequired()
                    .HasColumnName("estb_txt_endereco_numero")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.EstbUidEstabelecimento).HasColumnName("estb_uid_estabelecimento");

                entity.Property(e => e.MuniIdtMunicipio).HasColumnName("muni_idt_municipio");

                entity.HasOne(d => d.BairIdtBairroNavigation)
                    .WithMany(p => p.TbEstbEstabelecimento)
                    .HasForeignKey(d => d.BairIdtBairro)
                    .HasConstraintName("ct_estb_bair_f");

                entity.HasOne(d => d.MuniIdtMunicipioNavigation)
                    .WithMany(p => p.TbEstbEstabelecimento)
                    .HasForeignKey(d => d.MuniIdtMunicipio)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("ct_estb_muni_f");
            });

            modelBuilder.Entity<TbMuniMunicipio>(entity =>
            {
                entity.HasKey(e => e.MuniIdtMunicipio)
                    .HasName("ct_muni_p");

                entity.ToTable("tb_muni_municipio");

                entity.HasIndex(e => e.EsufIdtEstadoUf)
                    .HasName("idx_muni_01");

                entity.HasIndex(e => new { e.EsufIdtEstadoUf, e.MuniNomMunicipio })
                    .HasName("ct_muni_unq_01")
                    .IsUnique();

                entity.Property(e => e.MuniIdtMunicipio)
                    .HasColumnName("muni_idt_municipio")
                    .ValueGeneratedNever();

                entity.Property(e => e.EsufIdtEstadoUf).HasColumnName("esuf_idt_estado_uf");

                entity.Property(e => e.MuniDthCadastro)
                    .HasColumnName("muni_dth_cadastro")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.MuniNomMunicipio)
                    .IsRequired()
                    .HasColumnName("muni_nom_municipio")
                    .HasMaxLength(40)
                    .IsUnicode(false);
            });
        }
    }
}
