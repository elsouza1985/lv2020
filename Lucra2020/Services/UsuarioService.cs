using Lucra2020.Helpers;
using Lucra2020.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Lucra2020.Services
{
    public interface IUsuarioService
    {
        vwUsuario Authenticate(string username, string password);
        IEnumerable<vwUsuario> GetAll();
    }

    public class UsuarioService : IUsuarioService
    {
        // users hardcoded for simplicity, store in a db with hashed passwords in production applications
        private List<vwUsuario> _users = new List<vwUsuario>
        {
            new vwUsuario { NomeUsuario = "Test", EmailUsuario = "test", SenhaUsuario = "test" }
        };

        private readonly AppSettings _appSettings;

        public UsuarioService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public vwUsuario Authenticate(string username, string password)
        {
            var user = _users.SingleOrDefault(x => x.EmailUsuario == username && x.SenhaUsuario == password);

            // return null if user not found
            if (user == null)
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UidUsuario.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            //user.Token = tokenHandler.WriteToken(token);

            // remove password before returning
            user.SenhaUsuario = null;

            return user;
        }

        public IEnumerable<vwUsuario> GetAll()
        {
            // return users without passwords
            return _users.Select(x =>
            {
                x.SenhaUsuario = null;
                return x;
            });
        }
    }
}
