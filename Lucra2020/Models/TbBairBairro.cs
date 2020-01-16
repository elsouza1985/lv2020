using System;
using System.Collections.Generic;

namespace Lucra2020.Models
{
    public partial class TbBairBairro
    {
        public TbBairBairro()
        {
            TbEstbEstabelecimento = new HashSet<TbEstbEstabelecimento>();
        }

        public int BairIdtBairro { get; set; }
        public string BairNomBairro { get; set; }
        public int MuniIdtMunicipio { get; set; }

        public virtual TbMuniMunicipio MuniIdtMunicipioNavigation { get; set; }
        public virtual ICollection<TbEstbEstabelecimento> TbEstbEstabelecimento { get; set; }
    }
}
