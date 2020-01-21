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
        public  UserModel Authenticate(string login, string senha)
        {
            using (AppDbContext dbContext = new AppDbContext())
            {

                var pLogin = new SqlParameter("@EmailUsuario", login);
                var pSenha = new SqlParameter("@SenhaUsuario", senha);
                //var senha1 = Encoding.UTF8.GetBytes(senha);

                vwUsuario usuario = dbContext.VwUsuario.Where(x => x.EmailUsuario == login && x.SenhaUsuario == senha).FirstOrDefault();

                UserModel user = new UserModel
                {
                    Email = usuario.EmailUsuario,
                    Name = usuario.NomeUsuario
                };                                                   
                    

                return user;
            }


        }

    }
}

