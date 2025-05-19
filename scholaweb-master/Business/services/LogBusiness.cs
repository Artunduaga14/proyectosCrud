using Data.interfaces.crud;
using Entity.Model;
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
        public LogBusiness(ILogRepository logRepository)
        {
            _logRepository = logRepository;
        }

        public void LogAction(int userId, string accion, string entidad, string antes, string despues, string ip)
        {
            var log = new LogDatabase
            {
                UsuarioId = userId,
                Accion = accion,
                EntidadAfectada = entidad,
                DatosAntiguos = antes,
                DatosNuevos = despues,
                Fecha = DateTime.Now,
                IP = ip
            };
            _logRepository.RegistrarLog(log);
        }
    }

}
