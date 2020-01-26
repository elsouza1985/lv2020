using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Lucra2020.Models
{
    [Table("ServicoEstabelecimentoProduto", Schema ="dbo")]
    public class vwServicoEstabelecimentoProduto
    {
        [Key]
        public Guid UidServicoEstabalecimento { get; set; }
      public Guid UidProdutoEstabalecimento { get; set; }
      public Guid UidServicoEstabelecimentoProduto { get; set; }
      public string UnidadeDeMedida { get; set; }
      public decimal QtdProdutoServico { get; set; }
      public decimal ValorProdutoServico { get; set; }
    }
}
