using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Lucra2020.Models
{
    [Table("ServicoEstabelecimento", Schema ="dbo")]
    public class vwServicoEstabelecimento
    {
        [Key]
        public Guid UidServicoEstabalecimento { get; set; }
        public Guid UidEstabelecimento { get; set; }
      public string NomeServico { get; set; }
      public string UnidadeDeMedida { get; set; }
      public string TipoDeUnidadeDeMedida { get; set; }
      public int QtdTempo { get; set; }
      public decimal ValorServico { get; set; }
        public List<vwServicoEstabelecimentoProduto> Produtos { get; set; }
    }
}
