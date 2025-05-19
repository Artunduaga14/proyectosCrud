using Entity;
using Entity.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.init
{
    public static class DbInitializer
    {
        public static void Initialize(ApplicationDbContext context)
        {
            context.Database.Migrate();

            // Insertar Person
            if (!context.Person.Any())
            {
                var person = new Person
                {
                    Name = "Juan",
                    LastName = "Pérez",
                    Email = "juan.perez@example.com",
                    Identification = "1234567890",
                    Age = 30,
                    Status = 1
                };
                context.Person.Add(person);
                context.SaveChanges();

                // Insertar User
                var user = new User
                {
                    UserName = "admin",
                    Password = "hashedpassword", // Usa hash si tienes seguridad activa
                    Status = 1,
                    PersonId = person.Id
                };
                context.user.Add(user);
                context.SaveChanges();

                // Insertar Rol
                var rol = new Rol
                {
                    Name = "Administrador",
                    Description = "Rol con privilegios completos",
                    Status = 1
                };
                context.rol.Add(rol);
                context.SaveChanges();

                // Insertar Form
                var form = new Form
                {
                    Name = "Gestión de Usuarios",
                    Description = "Formulario para gestionar usuarios del sistema",
                    Status = 1
                };
                context.form.Add(form);
                context.SaveChanges();

                // Insertar Module
                var module = new Module
                {
                    Name = "Seguridad",
                    Description = "Módulo para administración de seguridad",
                    Status = 1
                };
                context.module.Add(module);
                context.SaveChanges();

                // Insertar Permission
                var permission = new Permission
                {
                    Name = "Crear",
                    Description = "Permiso para crear elementos",
                    Status = 1
                };
                context.permission.Add(permission);
                context.SaveChanges();

                // Insertar ModuleForm
                var moduleForm = new ModuleForm
                {
                    FormId = form.Id,
                    ModuleId = module.Id
                };
                context.ModuleForm.Add(moduleForm);
                context.SaveChanges();

                // Insertar UserRol
                var userRol = new UserRol
                {
                    UserId = user.Id,
                    RolId = rol.Id
                };
                context.RolUser.Add(userRol);
                context.SaveChanges();

                // Insertar RolFormPermission
                var rfp = new RolFormPermission
                {
                    FormId = form.Id,
                    RolId = rol.Id,
                    PermissionId = permission.Id
                };
                context.RolFormPermission.Add(rfp);
                context.SaveChanges();
            }
        }
    }
}