using Data.interfaces.crud;
using Entity.Model;
using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.repositories.Global
{
    public class LogRepository : ILogRepository
    {
        private readonly ApplicationDbContext _context;

        public LogRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void RegistrarLog(LogDatabase log)
        {
            _context.LogDatabase.Add(log);
            _context.SaveChanges();
        }
    }
}