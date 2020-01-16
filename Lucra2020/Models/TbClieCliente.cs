using System;
using System.Collections.Generic;

namespace Lucra2020.Models
{
    public partial class TbClieCliente
    {
        public int ClieIdtCliente { get; set; }
        public string ClieNomCliente { get; set; }
        public byte ClieNumDdd { get; set; }
        public long ClieNumTelefone { get; set; }
        public int EstbIdtEstabelecimento { get; set; }
        public DateTime ClieDatNascimento { get; set; }
        public string ClieTxtEmail { get; set; }
        public long? ClieNumCpf { get; set; }
        public DateTime ClieDthCadastro { get; set; }
        public bool? ClieBitAtivo { get; set; }
        public DateTime? ClieDthDesativacao { get; set; }
        public Guid ClieUidCliente { get; set; }

        public virtual TbEstbEstabelecimento EstbIdtEstabelecimentoNavigation { get; set; }
    }
}
