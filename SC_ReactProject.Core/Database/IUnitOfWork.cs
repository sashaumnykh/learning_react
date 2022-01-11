using SC_ReactProject.Core.EmployeeModule;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SC_ReactProject.Core.Database
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<Employee> Employees { get; }
        void Save();
    }
}
