using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Lucra2020.Models
{
    [Table("Produto",Schema ="dbo")]
    public class vwProduto
    {
        [Key]
        public int IdProduto { get; set; }
        public string NomeProduto { get; set; }
        public long EANProduto { get; set; }
    }
}
