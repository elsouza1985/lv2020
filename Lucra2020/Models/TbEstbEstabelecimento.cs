using System;
using System.Collections.Generic;

namespace Lucra2020.Models
{
    public partial class TbEstbEstabelecimento
    {
        public TbEstbEstabelecimento()
        {
            TbClieCliente = new HashSet<TbClieCliente>();
        }

        public int EstbIdtEstabelecimento { get; set; }
        public string EstbNomEstabelecimento { get; set; }
        public long EstbNumCpfCnpj { get; set; }
        public string EstbCodTipoDocumento { get; set; }
        public int EstbNumCep { get; set; }
        public string EstbTxtEndereco { get; set; }
        public string EstbTxtEnderecoNumero { get; set; }
        public string EstbTxtEnderecoComplemento { get; set; }
        public int MuniIdtMunicipio { get; set; }
        public int? BairIdtBairro { get; set; }
        public DateTime EstbDthCadastro { get; set; }
        public bool? EstbBitAtivo { get; set; }
        public DateTime? EstbDthDesativacao { get; set; }
        public Guid EstbUidEstabelecimento { get; set; }

        public virtual TbBairBairro BairIdtBairroNavigation { get; set; }
        public virtual TbMuniMunicipio MuniIdtMunicipioNavigation { get; set; }
        public virtual ICollection<TbClieCliente> TbClieCliente { get; set; }
    }
}
