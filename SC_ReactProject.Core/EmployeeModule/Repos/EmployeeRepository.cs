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
            IQueryable<Employee> emps = Enumerable.Empty<Employee>().AsQueryable();
            int count = db.Employees.Count();
            if (sortOrder == "default")
            {
                emps = db.Employees.Take(count);
            }
            else if (sort)
            {
                switch (comparer)
                {
                    case "name":
                        {
                            emps = (sortOrder == "desc")
                                ? db.Employees.OrderByDescending(e => e.name)
                                : db.Employees.OrderBy(e => e.name);
                            break;
                        }
                    case "email":
                        {
                            emps = (sortOrder == "desc")
                                ? db.Employees.OrderByDescending(e => e.email)
                                : db.Employees.OrderBy(e => e.email);
                            break;
                        }
                    case "bday":
                        {
                            emps = (sortOrder == "desc")
                                ? db.Employees.OrderByDescending(e => e.bday)
                                : db.Employees.OrderBy(e => e.bday);
                            break;
                        }
                    case "salary":
                        {
                            emps = (sortOrder == "desc")
                                ? db.Employees.OrderByDescending(e => e.salary)
                                : db.Employees.OrderBy(e => e.salary);
                            break;
                        }
                    case "lastModified":
                        {
                            emps = (sortOrder == "desc")
                                ? db.Employees.OrderByDescending(e => e.lastModified)
                                : db.Employees.OrderBy(e => e.lastModified);
                            break;
                        }
                }
            }

            if (count < page * 10)
            {
                return new GetAllResponse(
                employees: emps.Skip((page - 1) * 10).Take(count - (page - 1) * 10).ToArray(),
                count: count
            );
            }

            //employees.Sort(((p, q) => p.name.CompareTo(q.name)));
            return new GetAllResponse(
                employees: emps.Skip((page - 1) * 10).Take(10).ToArray(),
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
