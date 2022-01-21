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
        private List<Employee> employees = new List<Employee>();
        public EmployeeRepository(Context db)
        {
            this.db = db;
        }

        public EmployeeRepository()
        {
            var em1 = new Employee();
            em1.Name = "Sasha";
            em1.Email = "sasha@mail.ru";
            employees.Add(em1);
            db.Employees.Add(em1);
            var em2 = new Employee();
            em2.Name = "Polina";
            em2.Email = "polina@mail.ru";
            employees.Add(em2);
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
            //return db.Employees;
            return employees;
        }

        public void Update(Employee employee)
        {
            db.Entry(employee).State = EntityState.Modified;
        }
    }
}
