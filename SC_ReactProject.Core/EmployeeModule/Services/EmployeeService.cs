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

        public EmployeeService(IRepository<Employee> employeeRepo)
        {
            _employeeRepo = employeeRepo;
        }
        public void Create(EmployeeDTO employeeDTO)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public EmployeeDTO Find(int id)
        {
            throw new NotImplementedException();
        }

        public EmployeeDTO Get(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<EmployeeDTO> GetAll()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new EmployeeDTO
            {
                Name = rng.Next(-20, 55).ToString(),
                Email = rng.Next(-20, 55).ToString(),
                Salary = rng.Next(-20, 55).ToString()
            })
            .ToArray();
        }

        public void Update(EmployeeDTO employeeDTO)
        {
            throw new NotImplementedException();
        }
    }
}
