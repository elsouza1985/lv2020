using System;
using System.Collections.Generic;

namespace Lucra2020.Models
{
    public partial class TbMuniMunicipio
    {
        public TbMuniMunicipio()
        {
            TbBairBairro = new HashSet<TbBairBairro>();
            TbEstbEstabelecimento = new HashSet<TbEstbEstabelecimento>();
        }

        public int MuniIdtMunicipio { get; set; }
        public string MuniNomMunicipio { get; set; }
        public byte EsufIdtEstadoUf { get; set; }
        public DateTime MuniDthCadastro { get; set; }

        public virtual ICollection<TbBairBairro> TbBairBairro { get; set; }
        public virtual ICollection<TbEstbEstabelecimento> TbEstbEstabelecimento { get; set; }
    }
}
