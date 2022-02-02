using SC_ReactProject.Core.Database;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SC_ReactProject.Core.Common;

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

        public GetAllResponse GetAll(int page = 1, bool sort = false, string sortOrder = "default", string comparer = "name")
        {
            Employee[] employees = { };
            int count = db.Employees.ToList().Count;
            if (sortOrder == "default")
            {
                employees = db.Employees.ToArray();
            }
            else if (sort)
            {
                switch (comparer)
                {
                    case "name":
                        {
                            employees = db.Employees.OrderBy(e => e.name).ToArray();
                            break;
                        }
                    case "email":
                        {
                            employees = db.Employees.OrderBy(e => e.email).ToArray();
                            break;
                        }
                    case "bday":
                        {
                            employees = db.Employees.OrderBy(e => e.bday).ToArray();
                            break;
                        }
                    case "salary":
                        {
                            employees = db.Employees.OrderBy(e => e.salary).ToArray();
                            break;
                        }
                    case "lastModified":
                        {
                            employees = db.Employees.OrderBy(e => e.lastModified).ToArray();
                            break;
                        }
                }
                if (sortOrder == "desc")
                {
                    Array.Reverse(employees);
                }
            }

            int len = employees.Length;

            if (len < page * 10)
            {
                return new GetAllResponse(
                employees: new ArraySegment<Employee>(employees).Slice((page - 1) * 10, len - (page - 1) * 10),
                count: count
            );
            }

            //employees.Sort(((p, q) => p.name.CompareTo(q.name)));
            return new GetAllResponse(
                employees: new ArraySegment<Employee>(employees).Slice((page - 1) * 10, 10),
                count: count
            );
        }

        public void Update(Employee employee)
        {
            Employee emp = db.Employees.Find(employee.employeeId);
            emp.name = employee.name;
            emp.bday = employee.bday;
            emp.salary = employee.salary;
            emp.lastModified = employee.lastModified;
            db.SaveChanges();
        }
    }
}
