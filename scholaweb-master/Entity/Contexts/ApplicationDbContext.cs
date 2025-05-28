using Dapper;
using Entity.Model;
using Entity.Model.Base;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Text.Json;

namespace Entity
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Person> Person { get; set; }
        public DbSet<Rol> rol { get; set; }
        public DbSet<Form> form { get; set; }
        public DbSet<Module> module { get; set; }
        public DbSet<Permission> permission { get; set; }
        public DbSet<User> user { get; set; }
        public DbSet<UserRol> RolUser { get; set; }
        public DbSet<ModuleForm> ModuleForm { get; set; }
        public DbSet<RolFormPermission> RolFormPermission { get; set; }
        public DbSet<LogDatabase> LogDatabase { get; set; }

        protected readonly IConfiguration? _configuration;

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IConfiguration? configuration = null)
            : base(options)
        {
            _configuration = configuration;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuraciones específicas para LogDatabase
            modelBuilder.Entity<LogDatabase>()
                .HasKey(l => l.Id);

            modelBuilder.Entity<LogDatabase>()
                .Property(l => l.Id)
                .ValueGeneratedOnAdd();
        }


        //Metodo Sobreescrito para la Auditoria
        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var now = DateTime.UtcNow;
            var currentUser = "system"; // TODO: Reemplazar por usuario actual cuando implementes auth

            var entries = ChangeTracker.Entries()
                .Where(e =>
                    e.Entity is AuditableEntity &&
                    e.State is EntityState.Added or EntityState.Modified or EntityState.Deleted)
                .ToList();

            foreach (var entry in entries)
            {
                // Evitar auditar registros de la propia tabla de logs
                if (entry.Entity is LogDatabase)
                    continue;

                var entity = (AuditableEntity)entry.Entity;

                var tableName = entry.Metadata.GetTableName()!;
                var key = entry.Properties.First(p => p.Metadata.IsPrimaryKey()).CurrentValue?.ToString();

                switch (entry.State)
                {
                    case EntityState.Added:
                        entity.CreatedAt = now;
                        entity.CreatedBy = currentUser;

                        LogDatabase.Add(new LogDatabase
                        {
                            TableName = tableName,
                            Action = "Insert",
                            Key = key,
                            Changes = JsonSerializer.Serialize(
                                entry.CurrentValues.Properties.ToDictionary(p => p.Name, p => entry.CurrentValues[p.Name])
                            ),
                            Timestamp = now,
                            PerformedBy = currentUser
                        });
                        break;

                    case EntityState.Modified:
                        entity.UpdatedAt = now;
                        entity.UpdatedBy = currentUser;

                        var changes = new
                        {
                            Original = entry.OriginalValues.Properties.ToDictionary(p => p.Name, p => entry.OriginalValues[p.Name]),
                            Current = entry.CurrentValues.Properties.ToDictionary(p => p.Name, p => entry.CurrentValues[p.Name])
                        };

                        LogDatabase.Add(new LogDatabase
                        {
                            TableName = tableName,
                            Action = "Update",
                            Key = key,
                            Changes = JsonSerializer.Serialize(changes),
                            Timestamp = now,
                            PerformedBy = currentUser
                        });
                        break;

                    case EntityState.Deleted:
                        LogDatabase.Add(new LogDatabase
                        {
                            TableName = tableName,
                            Action = "Delete",
                            Key = key,
                            Changes = JsonSerializer.Serialize(
                                entry.OriginalValues.Properties.ToDictionary(p => p.Name, p => entry.OriginalValues[p.Name])
                            ),
                            Timestamp = now,
                            PerformedBy = currentUser
                        });
                        break;
                }
            }

            return await base.SaveChangesAsync(cancellationToken);
        }
    }
}
