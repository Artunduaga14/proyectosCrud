using Business;
using Business.services;
using Data;
using Data.factories;
using Data.interfaces.crud;
using Data.repositories.Global;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Web.Extensions
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddCustomServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthorization();
            services.AddScoped<IDataFactoryGlobal, GlobalFactory>();
            services.AddDataAccessFactory("SQLServer", configuration);
            
            // Business & Data
            services.AddScoped<AuthService>();
            services.AddScoped<UserData>();
            services.AddScoped<UserRolData>();
            services.AddScoped<PersonBusiness>();
            services.AddScoped<RolBusiness>();
            services.AddScoped<FormBusiness>();
            services.AddScoped<ModuleBusiness>();
            services.AddScoped<ModuleFormBusiness>();
            services.AddScoped<UserBusiness>();
            services.AddScoped<UserRolBusiness>();
            services.AddScoped<RolFormPermissionBusiness>();
            services.AddScoped<PermissionBusiness>();
            
          
            // AutoMapper
            services.AddAutoMapper(typeof(Helper.MappingProfile));
            
            return services;
        }
    }
}