using SC_ReactProject.Core.EmployeeModule;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SC_ReactProject.Core.Database
{
    public class EFUnitOfWork : IUnitOfWork
    {
        private Context db;
        private EmployeeRepository employeeRepository;

        public EFUnitOfWork(string connectionString)
        {
            db = new Context(connectionString);
        }
        public IRepository<Employee> Employees
        {
            get
            {
                if (employeeRepository == null)
                {
                    employeeRepository = new EmployeeRepository(db);
                }
                return employeeRepository;
            }
        }
        private bool disposed = false;
        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    db.Dispose();
                }
                this.disposed = true;
            }
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public void Save()
        {
            db.SaveChanges();
        }
    }
}
