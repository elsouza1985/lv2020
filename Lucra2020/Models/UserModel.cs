using System.Collections.Generic;


namespace Lucra2020.Models
{
    public class UserModel
    {
        public string Name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public List<Estabelecimento> Estabelecimentos { get; set; }
        public List<Perfil> Perfil {get;set;}
    }
}
