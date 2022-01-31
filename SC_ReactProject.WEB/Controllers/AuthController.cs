using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SC_ReactProject.Core.AuthModule.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SC_ReactProject.WEB.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private const string SECRET_KEY = "TQvgjeABMPOwCycOqah5EQu5yyVjpmVG";
        public static readonly SymmetricSecurityKey SIGNING_KEY = new
                      SymmetricSecurityKey(Encoding.UTF8.GetBytes(SECRET_KEY));

        private List<User> _users = new List<User>
        {
            new User(0, "admin", "admin")
        };

        [HttpPost("authenticate")]
        [Route("/login")]
        public IActionResult Authenticate(AuthRequest model)
        {
            var user = _users.SingleOrDefault(x => x.login == model.login && x.password == model.password);
            if (user == null) return null;
            return new ObjectResult(GenerateToken(model.login));
        }
        private string GenerateToken(string login)
        {
            var token = new JwtSecurityToken(
                claims: new Claim[] { new Claim(ClaimTypes.Name, login) },
                notBefore: new DateTimeOffset(DateTime.Now).DateTime,
                expires: new DateTimeOffset(DateTime.Now.AddMinutes(60)).DateTime,
                signingCredentials: new SigningCredentials(SIGNING_KEY,
                                                    SecurityAlgorithms.HmacSha256)
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
