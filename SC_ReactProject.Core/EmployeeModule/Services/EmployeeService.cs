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

        public IEnumerable<Employee> GetAll()
        {
            return _employeeRepo.GetAll();
        }

        public void Update(EmployeeDTO employeeDTO)
        {
            throw new NotImplementedException();
        }
    }
}
