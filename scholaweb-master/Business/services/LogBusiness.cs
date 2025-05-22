using Data.interfaces.crud;
using Entity.Model;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.services
{
    public class LogBusiness
    {
        private readonly ILogRepository _logRepository;
        private readonly ILogger<LogBusiness> _logger; // Opcional, para depuración interna

        public LogBusiness(
            ILogRepository logRepository,
            ILogger<LogBusiness> logger = null)
        {
            _logRepository = logRepository ?? throw new ArgumentNullException(nameof(logRepository));
            _logger = logger;
        }

        public void LogAction(int userId, string accion, string entidad, string antes, string despues, string ip)
        {
            try
            {
                // Validación básica
                if (string.IsNullOrEmpty(accion))
                    accion = "UNDEFINED";

                if (string.IsNullOrEmpty(entidad))
                    entidad = "UNDEFINED";

                // Crear objeto de log
                var log = new LogDatabase
                {
                    UsuarioId = userId,
                    Accion = accion,
                    EntidadAfectada = entidad,
                    DatosAntiguos = antes ?? string.Empty,
                    DatosNuevos = despues ?? string.Empty,
                    Fecha = DateTime.Now,
                    IP = ip ?? "0.0.0.0"
                };

                // Registrar en la base de datos
                _logRepository.RegistrarLog(log);

                // Registro opcional para depuración
                _logger?.LogDebug($"Log registrado: {entidad} - {accion} por usuario {userId}");
            }
            catch (Exception ex)
            {
                // Capturamos la excepción para evitar que interrumpa el flujo principal
                // pero la registramos con el logger del sistema si está disponible
                _logger?.LogError(ex, $"Error al registrar log: {ex.Message}");

                // Podríamos relanzar la excepción dependiendo de los requerimientos
                // throw;
            }
        }
    }
}