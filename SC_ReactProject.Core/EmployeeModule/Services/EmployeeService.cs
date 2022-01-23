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
                bday: dto.bday
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
                salary: employee.salary
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

        public IEnumerable<EmployeeDTO> GetAll()
        {
            List<EmployeeDTO> emps = new List<EmployeeDTO>();
            foreach (Employee employee in _employeeRepo.GetAll())
            {
                emps.Add(ToDTO(employee));
            }
            return emps;
        }

        public void Update(EmployeeDTO employeeDTO)
        {
            Employee employee = FromDTO(employeeDTO);
            _employeeRepo.Update(employee);
        }
    }
}
