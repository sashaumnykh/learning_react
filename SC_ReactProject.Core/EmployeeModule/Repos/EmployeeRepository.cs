using SC_ReactProject.Core.Database;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SC_ReactProject.Core.EmployeeModule
{
    public class EmployeeRepository : IRepository<Employee>
    {
        private Context db;
        public EmployeeRepository(Context db)
        {
            this.db = db;
        }

        public void Create(Employee employee)
        {
            db.Employees.Add(employee);
        }

        public void Delete(int id)
        {
            Employee employee = db.Employees.Find(id);
            if (employee != null)
            {
                db.Employees.Remove(employee);
            }
        }

        public Employee Get(int id)
        {
            return db.Employees.Find(id);
        }

        public IEnumerable<Employee> GetAll()
        {
            return db.Employees;
        }

        public void Update(Employee employee)
        {
            db.Entry(employee).State = EntityState.Modified;
        }
    }
}
