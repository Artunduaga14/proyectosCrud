//using Entity;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.Extensions.Configuration;
//using Microsoft.Extensions.DependencyInjection;

//namespace Web.Extensions
//{
//    public static class DbContextServiceExtension
//    {
//        public static IServiceCollection AddDbContextService(this IServiceCollection services, IConfiguration configuration)
//        {
//            // Asegurarse de que la cadena de conexión exista
//            var connectionString = configuration.GetConnectionString("DefaultConnection");
//            if (string.IsNullOrEmpty(connectionString))
//            {
//                throw new System.Exception("La cadena de conexión 'DefaultConnection' no está configurada.");
//            }

//            // Registrar el contexto de base de datos
//            services.AddDbContext<ApplicationDbContext>(options =>
//                options.UseSqlServer(connectionString, sqlOptions =>
//                {
//                    sqlOptions.EnableRetryOnFailure(
//                        maxRetryCount: 5,
//                        maxRetryDelay: System.TimeSpan.FromSeconds(30),
//                        errorNumbersToAdd: null);
//                })
//            );

//            return services;
//        }
//    }
//}