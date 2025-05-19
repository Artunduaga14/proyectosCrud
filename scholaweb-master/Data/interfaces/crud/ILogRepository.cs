using Entity.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.interfaces.crud
{
    public interface ILogRepository
    {
        void RegistrarLog(LogDatabase log);
    }
}