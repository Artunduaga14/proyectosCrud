
//using Data.repositories.Global;
//using Entity.DTOs;
//using Entity.Model;
//using Microsoft.Extensions.DependencyInjection;
//using Org.BouncyCastle.Crypto;

//namespace Data.Dependencias
//{
//    public static class DataInitializer
//    {
//        public static async Task InitializeAsync(IServiceProvider services)
//        {
//            // FORM
//            await InitializeEntityAsync(services, async (repoObj) =>
//            {
//                var repo = (FormData)repoObj;

//                using var scope = services.CreateScope();
//                var mapper = scope.ServiceProvider.GetRequiredService<IMapper>();

//                //var formData = (FormData)repo;
//                var existing = await repo.GetAllAsyncLinq();
//                if (!existing.Any())
//                {
//                    var forms = new List<FormDto>
//                    {
//                        new() { Name = "Dashboard", Description = "Vista principal", Status = 1 },
//                        new() { Name = "Usuarios", Description = "Gestión de usuarios", Status = 1 },
//                    };

//                    foreach (var item in forms)
//                    {
//                        var entity = mapper.Map<Form>(item);
//                        await repo.CreateAsyncLinq(entity);
//                    }
//                }
//            }, typeof(FormData));

//        //    // MODULE
//        //    await InitializeEntityAsync(services, async repo =>
//        //    {
//        //        var moduleData = (ModuleData)repo;
//        //        var existing = await moduleData.GetAllAsyncLinq();
//        //        if (!existing.Any())
//        //        {
//        //            var modules = new List<ModuleDto>
//        //            {
//        //                new() { Name = "Administración", Description = "Módulo de Admin", Status = 1 },
//        //                new() { Name = "Reportes", Description = "Módulo de Reportes", Status = 1 },
//        //            };

//        //            foreach (var item in modules)
//        //                await moduleData.CreateAsyncLinq(item);
//        //        }
//        //    }, typeof(ModuleData));

//        //    // PERMISSION
//        //    await InitializeEntityAsync(services, async repo =>
//        //    {
//        //        var permissionData = (PermissionData)repo;
//        //        var existing = await permissionData.GetAllAsyncLinq();
//        //        if (!existing.Any())
//        //        {
//        //            var permissions = new List<PermissionDto>
//        //            {
//        //                new() { Name = "Ver", Description = "Permite ver información", Status = 1 },
//        //                new() { Name = "Editar", Description = "Permite editar información", Status = 1 },
//        //                new() { Name = "Eliminar", Description = "Permite eliminar información", Status = 1 },
//        //            };

//        //            foreach (var item in permissions)
//        //                await permissionData.CreateAsyncLinq(item);
//        //        }
//        //    }, typeof(PermissionData));

//        //    // PERSON
//        //    await InitializeEntityAsync(services, async repo =>
//        //    {
//        //        var personData = (PersonData)repo;
//        //        var existing = await personData.GetAllAsyncLinq();
//        //        if (!existing.Any())
//        //        {
//        //            var persons = new List<PersonDto>
//        //            {
//        //                new() { Name = "Juan", LastName = "Pérez", Email = "juan@mail.com", Identification = "123456", Age = 30, Status = 1 },
//        //            };

//        //            foreach (var item in persons)
//        //                await personData.CreateAsyncLinq(item);
//        //        }
//        //    }, typeof(PersonData));

//        //    // ROL
//        //    await InitializeEntityAsync(services, async repo =>
//        //    {
//        //        var rolData = (RolData)repo;
//        //        var existing = await rolData.GetAllAsyncLinq();
//        //        if (!existing.Any())
//        //        {
//        //            var roles = new List<RolDto>
//        //            {
//        //                new() { Name = "Admin", Description = "Administrador", Status = 1 },
//        //                new() { Name = "Usuario", Description = "Usuario común", Status = 1 },
//        //            };

//        //            foreach (var item in roles)
//        //                await rolData.CreateAsyncLinq(item);
//        //        }
//        //    }, typeof(RolData));

//        //    // USER
//        //    await InitializeEntityAsync(services, async repo =>
//        //    {
//        //        var userData = (UserData)repo;
//        //        var existing = await userData.GetAllAsyncLinq();
//        //        if (!existing.Any())
//        //        {
//        //            var users = new List<UserDto>
//        //            {
//        //                new() { UserName = "admin", Password = "admin123", Status = 1, PersonId = 1 },
//        //            };

//        //            foreach (var item in users)
//        //                await userData.CreateAsyncLinq(item);
//        //        }
//        //    }, typeof(UserData));
//        //}

//        private static async Task InitializeEntityAsync(IServiceProvider services, Func<object, Task> initializer, Type repositoryType)
//        {
//            using var scope = services.CreateScope();
//            var repo = scope.ServiceProvider.GetRequiredService(repositoryType);
//            await initializer(repo);
//        }
//    }
//}
