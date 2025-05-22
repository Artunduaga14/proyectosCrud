using Dapper;
using Entity.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Configuration;
using System.Data;

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

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IConfiguration configuration = null)
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

            modelBuilder.Entity<LogDatabase>()
                .HasIndex(l => l.Fecha);

            modelBuilder.Entity<LogDatabase>()
                .HasIndex(l => l.UsuarioId);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.EnableSensitiveDataLogging();
        }

        protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
        {
            configurationBuilder.Properties<decimal>().HavePrecision(18, 2);
        }

        public override int SaveChanges()
        {
            EnsureAudit();
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            EnsureAudit();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        public async Task<IEnumerable<T>> QueryAsync<T>(string text, object parameters = null, int? timeout = null, CommandType? type = null)
        {
            using var command = new DapperEFCoreCommand(this, text, parameters, timeout, type, CancellationToken.None);
            var connection = this.Database.GetDbConnection();
            return await connection.QueryAsync<T>(command.Definition);
        }

        public async Task<T> QueryFirstOrDefaultAsync<T>(string text, object parameters = null, int? timeout = null, CommandType? type = null)
        {
            using var command = new DapperEFCoreCommand(this, text, parameters, timeout, type, CancellationToken.None);
            var connection = this.Database.GetDbConnection();
            return await connection.QueryFirstOrDefaultAsync<T>(command.Definition);
        }

        public async Task<int> ExecuteAsync(string text, object parametres = null, int? timeout = null, CommandType? type = null)
        {
            using var command = new DapperEFCoreCommand(this, text, parametres, timeout, type, CancellationToken.None);
            var connection = this.Database.GetDbConnection();
            return await connection.ExecuteAsync(command.Definition);
        }

        public async Task<T> ExecuteScalarAsync<T>(string query, object parameters = null, int? timeout = null, CommandType? type = null)
        {
            using var command = new DapperEFCoreCommand(this, query, parameters, timeout, type, CancellationToken.None);
            var connection = this.Database.GetDbConnection();
            return await connection.ExecuteScalarAsync<T>(command.Definition);
        }

        private void EnsureAudit()
        {
            ChangeTracker.DetectChanges();
        }

        public readonly struct DapperEFCoreCommand : IDisposable
        {
            public DapperEFCoreCommand(DbContext context, string text, object parameters, int? timeout, CommandType? type, CancellationToken ct)
            {
                var transaction = context.Database.CurrentTransaction?.GetDbTransaction();
                var commandType = type ?? CommandType.Text;
                var commandTimeout = timeout ?? context.Database.GetCommandTimeout() ?? 30;

                Definition = new CommandDefinition(
                    text,
                    parameters,
                    transaction,
                    commandTimeout,
                    commandType,
                    cancellationToken: ct
                );
            }

            public CommandDefinition Definition { get; }

            public void Dispose() { }
        }
    }
}
