using Business;
using Business.services;
using Data;
using Data.factories;
using Data.repositories.Global;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Web.Extensions
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddCustomServices(this IServiceCollection services, IConfiguration configuration)
        {

            // db disponibles
            //MySQL
            //SQLServer
            //PgAdmin

            services.AddAuthorization();
            services.AddScoped<IDataFactoryGlobal, GlobalFactory>();
            services.AddDataAccessFactory("SQLServer", configuration);

            // Business & Data
            services.AddScoped<AuthService>();
            services.AddScoped<PersonBusiness>();
            services.AddScoped<RolBusiness>();
            services.AddScoped<FormBusiness>();
            services.AddScoped<ModuleBusiness>();
            services.AddScoped<ModuleFormBusiness>();
            services.AddScoped<UserBusiness>();
            services.AddScoped<UserRolBusiness>();
            services.AddScoped<RolFormPermissionBusiness>();
            services.AddScoped<PermissionBusiness>();

            services.AddScoped<UserData>();
            services.AddScoped<UserRolData>();

            // AutoMapper
            services.AddAutoMapper(typeof(Helper.MappingProfile));

            return services;
        }

        public static IServiceCollection AddSwaggerDocumentation(this IServiceCollection services)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            return services;
        }

        public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero,
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!))
                    };
                });

            return services;
        }

        public static IServiceCollection AddCorsPolicy(this IServiceCollection services)
        {
            var angularOrigin = "http://localhost:4200";

            services.AddCors(options =>
            {
                options.AddPolicy(name: "AllowAngularOrigin", policy =>
                {
                    policy.WithOrigins(angularOrigin)
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            return services;
        }
    }
}
