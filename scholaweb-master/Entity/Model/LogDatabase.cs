using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.Model
{
    
    public class LogDatabase
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public string Accion { get; set; } = string.Empty; // INSERT, UPDATE, DELETE
        public string EntidadAfectada { get; set; } = string.Empty;
        public string DatosAntiguos { get; set; } = string.Empty;
        public string DatosNuevos { get; set; } = string.Empty;
        public DateTime Fecha { get; set; } = DateTime.Now;
        public string IP { get; set; } = string.Empty;
    }

}
