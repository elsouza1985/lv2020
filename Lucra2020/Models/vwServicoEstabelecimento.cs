﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Lucra2020.Models
{
    [Table("ServicoEstabelecimento", Schema = "dbo")]
    public class vwServicoEstabelecimento
    {
        [Key]
        public Guid UidServicoEstabelecimento { get; set; }
        public Guid UidEstabelecimento { get; set; }
        public string NomeServico { get; set; }
        public string UnidadeMedida { get; set; }
        public string TipoDeUnidadeMedida { get; set; }
        public Byte QtdTempo { get; set; }
        public decimal ValorServico { get; set; }
        public List<vwServicoEstabelecimentoProduto> Produtos { get; set; }

    }
}