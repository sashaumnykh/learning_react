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

        public int Create(Employee employee)
        {
            db.Employees.Add(employee);
            db.SaveChanges();
            return employee.employeeId;
        }

        public void Delete(int id)
        {
            Employee employee = db.Employees.Find(id);
            if (employee != null)
            {
                db.Employees.Remove(employee);
            }
            db.SaveChanges();
        }

        public Employee Get(int id)
        {
            return db.Employees.Find(id);
        }

        public IEnumerable<Employee> GetAll()
        {
            return db.Employees.ToList();
        }

        public void Update(Employee employee)
        {
            Employee emp = db.Employees.Find(employee.employeeId);
            emp.name = employee.name;
            emp.bday = employee.bday;
            emp.salary = employee.salary;
            db.SaveChanges();
        }
    }
}
