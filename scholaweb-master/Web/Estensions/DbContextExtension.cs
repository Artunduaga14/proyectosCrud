using Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace Web.Extensions
{
    public static class DbContextExtension
    {
        public static IServiceCollection AddDbContextService(this IServiceCollection services, IConfiguration configuration)
        {
            // Verifica que la cadena de conexión esté definida
            var connectionString = configuration.GetConnectionString("DefaultConnection");
            if (string.IsNullOrEmpty(connectionString))
            {
                throw new Exception("La cadena de conexión 'DefaultConnection' no está configurada.");
            }

            // Configura el DbContext con reintentos en caso de errores transitorios
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(connectionString, sqlOptions =>
                {
                    sqlOptions.EnableRetryOnFailure(
                        maxRetryCount: 5,
                        maxRetryDelay: TimeSpan.FromSeconds(30),
                        errorNumbersToAdd: null);
                })
            );

            return services;
        }
    }
}
