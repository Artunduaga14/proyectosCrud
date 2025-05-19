using Data.interfaces;
using Entity;
using Entity.DTOs;
using Entity.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Org.BouncyCastle.Asn1;

namespace Data.repositories.Global
{
    public class UserData : GenericData<User>
    {
        private readonly ApplicationDbContext _context;
        public UserData(ApplicationDbContext context, ILogger<User> logger) : base(context, logger)
        {
            _context = context;
        }

        public async Task<User> ValidateUser(LoginDto login)
        {
            var user = await _context.Set<User>()
                .Where(u => u.UserName == login.UserName && u.Password == login.Password)
                .FirstOrDefaultAsync();

            bool sucess = false;
            sucess = (user != null) ? true : throw new UnauthorizedAccessException("Credenciales inválidas");

            return user;
            //return user != null;
        }

        public async Task<User?> ObtenerPorId(int id)
        {
            return await GetByIdAsyncLinq(id);
        }

        public async Task<bool> Actualizar(User user)
        {
            return await UpdateAsyncLinq(user);
        }



    }
}