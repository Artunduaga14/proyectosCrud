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
        public string TableName { get; set; } = string.Empty;
        public string Action { get; set; } = string.Empty;
        public string? Key { get; set; }
        public string? Changes { get; set; }
        public DateTime Timestamp { get; set; }
        public string? PerformedBy { get; set; }
    }

}