using Lucra2020.Helpers;
using Lucra2020.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;



namespace Lucra2020.Services
{
    public interface IUsuarioService
    {
        UserModel Authenticate(string login, string senha);
    
    }
    
    public class UsuarioService : IUsuarioService
    {
        private readonly AppDbContext _context;
        public UsuarioService(AppDbContext context)
        {
            _context = context;
        }
        public UserModel Authenticate(string login, string senha)
        {


            //var pLogin = new SqlParameter("@EmailUsuario", login);
            //var pSenha = new SqlParameter("@SenhaUsuario", senha);
            var senha1 = Encoding.UTF8.GetBytes(senha);
            StringBuilder query = new StringBuilder();
            query.Append(@"SELECT TOP(1) *
                FROM[sec].[UsuarioPerfilPapel] AS[a]
                WHERE([a].[EmailUsuario] = '");
            query.Append(login);
            query.Append("') AND(PWDCOMPARE('");
            query.Append(senha);
            query.Append("', [a].[SenhaUsuario]) = 1)");
            var usuario = _context.VwUsuario.FromSql<vwUsuario>(query.ToString()).FirstOrDefault();
            if (usuario == null)
            {
                return null;
            }
            List<Estabelecimento> estabelecimentos = new List<Estabelecimento>();
            if (usuario.Estabelecimento != null)
            {
                 estabelecimentos = (List<Estabelecimento>)JsonConvert.DeserializeObject(usuario.Estabelecimento);
            }
            else
            {
                estabelecimentos.Add(new Estabelecimento());
            }
            var paps = JsonConvert.DeserializeObject(usuario.Papeis);
          
          //  List<Papel> papeis = (List<Papel>)JsonConvert.DeserializeObject(usuario.Papeis);
            UserModel user = new UserModel
            {
                Name = usuario.NomeUsuario,
                Estabelecimentos = estabelecimentos,
                Perfil = usuario.Perfil,
                
            };
                //{
                //    Email = usuario.EmailUsuario,
                //    Name = usuario.NomeUsuario
                //};                                                   
                    

                return user;
            


        }

    }
}

