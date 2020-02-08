using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Lucra2020.Models;
using Lucra2020.Security;
using Lucra2020.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Lucra2020.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IConfiguration _config;
        private readonly AppDbContext _context;

        public LoginController(IConfiguration config, AppDbContext context)
        {
            _config = config;
            _context = context;

        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<object> PostAsync(
              [FromBody]User usuario,
              [FromServices]AccessManager accessManager)
        {
            if (await accessManager.ValidateCredentialsAsync(usuario))
            {
                return accessManager.GenerateToken(usuario);
            }
            else
            {
                return new
                {
                    Authenticated = false,
                    Message = "Falha ao autenticar"
                };
            }
        }
        [HttpGet]
        public IActionResult Login(string username, string pass)
        {
            UserModel login = new UserModel();
            login.Email = username;
            login.Password = pass;
            IActionResult response = Unauthorized();

            var user = AuthenticateUser(login);
            if (user != null)
            {
                var tokenStr = GenerateJSONToken(user);
                response = Ok(new { token = tokenStr });
            }
            return response;
        }

        private UserModel AuthenticateUser(UserModel login)
        {
            UserModel user = null;
            IUsuarioService usuarioService = new UsuarioService(_context);
            user = usuarioService.Authenticate(login.Email,login.Password);
            return user;
        }
        private string GenerateJSONToken(UserModel userinfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userinfo.Name),
                new Claim(JwtRegisteredClaimNames.Sub, userinfo.UidUsuario.ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, userinfo.Estabelecimentos[0].UidEstabelecimento!=null?userinfo.Estabelecimentos[0].UidEstabelecimento.ToString():new Guid().ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };
          
            var token = new JwtSecurityToken(
                    issuer: _config["Jwt:Issuer"],
                    audience: _config["Jwt:Issuer"],
                    expires: DateTime.Now.AddMinutes(120),
                    signingCredentials: credentials);
            var encondetoken = new JwtSecurityTokenHandler().WriteToken(token);
            return encondetoken;
        }
        [Authorize]
        [HttpPost("Post")]
        public string Post()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claim = identity.Claims.ToList();
            var userName = claim[0].Value;
            return "Welcome to: " + userName;
        }

        [Authorize]
        [HttpGet("GetValue")]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2", "value3" };
        }



    }

}
