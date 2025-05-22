using Data.repositories.Global;
using Entity.DTOs;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Business.services
{
    public class AuthService
    {
        private readonly IConfiguration _config;
        private readonly UserData _user;
        private readonly UserRolData _userRol;

        public AuthService(IConfiguration config, UserData user,UserRolData userRol)
        {
            _config = config;
            _user = user;
            _userRol = userRol;
        }

        public async Task<string> CreateToken(LoginDto dto)
        {
            var user = await _user.ValidateUser(dto);
            if (user == null)
            {
                return null;
            }
            var roles = await GetRoles(user.Id);

            var claims = new List<Claim>
     {
         new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
         new Claim(ClaimTypes.Name, user.UserName),
     };

            // Add each role as a separate Claim
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
                
            var SecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var credentials = new SigningCredentials(SecurityKey, SecurityAlgorithms.HmacSha256Signature);

            //detalle del token
            var jwtConfig = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(_config["Jwt:Expiration"])),
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(jwtConfig);
        }

        public async Task<IEnumerable<string>> GetRoles(int idUser)
        {
            var roles = await _userRol.GetRolUserAsync(idUser);
            return roles;
        }

    }
}
