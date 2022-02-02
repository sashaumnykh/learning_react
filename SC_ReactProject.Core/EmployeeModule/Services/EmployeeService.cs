using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SC_ReactProject.Core.EmployeeModule.Services
{
    public class EmployeeService : IEmployeeService
    {
        private IRepository<Employee> _employeeRepo;

        public Employee FromDTO(EmployeeDTO dto)
        {
            return new Employee(
                employeeId: dto.employeeId,
                name: dto.name,
                email: dto.email,
                salary: dto.salary,
                bday: dto.bday,
                lastModified: dto.lastModified
            );
        }
        public EmployeeDTO ToDTO(Employee employee)
        {
            return new EmployeeDTO
            (
                employeeId: employee.employeeId,
                name: employee.name,
                email: employee.email,
                bday: employee.bday,
                salary: employee.salary,
                lastModified: employee.lastModified
            );
        }
        public EmployeeService(IRepository<Employee> employeeRepo)
        {
            _employeeRepo = employeeRepo;
        }
        public int Create(EmployeeDTO employeeDTO)
        {
            Employee employee = FromDTO(employeeDTO);
            return _employeeRepo.Create(employee);
        }

        public void Delete(int id)
        {
            _employeeRepo.Delete(id);
        }

        public EmployeeDTO Get(int id)
        {
            Employee employee = _employeeRepo.Get(id);
            return ToDTO(employee);
        }

        public (IEnumerable<EmployeeDTO>, int) GetAll(int page = 0, bool sort = false, string sortOrder = "default", string comparer = "name")
        {
            List<EmployeeDTO> emps = new List<EmployeeDTO>();
            (IEnumerable<Employee> employees, int count) = _employeeRepo.GetAll(page, sort, sortOrder, comparer);
            foreach (Employee employee in employees)
            {
                emps.Add(ToDTO(employee));
            }
            return (emps, count);
        }

        public void Update(EmployeeDTO employeeDTO)
        {
            Employee employee = FromDTO(employeeDTO);
            _employeeRepo.Update(employee);
        }
    }
}
