using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity;
using Entity.DTOs;
using Entity.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Org.BouncyCastle.Asn1;

namespace Data.repositories.Global
{
    public class UserRolData : GenericData<UserRol>
    {
        private ApplicationDbContext context;
        private ILogger<UserRolData> _logger;
        public UserRolData(ApplicationDbContext context, ILogger<UserRol> logger) : base(context, logger)
        {
            this.context = context;
        }

        public override async Task<IEnumerable<UserRol>> GetAllAsyncLinq()
        {
            try
            {
                return await context.RolUser
                    .Include(ur => ur.User)
                    .Include(ur => ur.Rol)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving UserRols");
                throw;
            }
        }

        public override async Task<UserRol> GetByIdAsyncLinq(int id)
        {
            try
            {
                return await context.RolUser
                    .Include(ur => ur.User)
                    .Include(ur => ur.Rol)
                    .FirstOrDefaultAsync(ur => ur.Id == id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving UserRols");
                throw;
            }
        }

        public async Task<IEnumerable<string>> GetRolUserAsync(int idUser)
        {
            // Usar el _dbSet genérico para hacer la consulta
            var roleAssignments = await context.RolUser
                .Include(ru => ru.Rol)  // Incluir la relación con la entidad 'rol'
                .Where(ru => ru.UserId == idUser)  // Filtros adecuados
                .ToListAsync();  // Ejecutar la consulta de manera asincrónica

            // Extraer los nombres de los roles, asegurándose de que no sean vacíos ni nulos
            var roles = roleAssignments
                            .Select(ru => ru.Rol.Name)
                            .Where(name => !string.IsNullOrWhiteSpace(name))  // Filtrar nombres no vacíos
                            .Distinct()  // Eliminar duplicados
                            .ToList();  // Convertir el resultado en una lista

            return roles;

        }



    }
}

