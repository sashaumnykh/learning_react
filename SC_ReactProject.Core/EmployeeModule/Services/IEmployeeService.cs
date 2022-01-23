using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SC_ReactProject.Core.EmployeeModule.Services
{
    public interface IEmployeeService
    {
        EmployeeDTO Get(int id);
        IEnumerable<EmployeeDTO> GetAll();
        int Create(EmployeeDTO employeeDTO);
        void Delete(int id);
        void Update(EmployeeDTO employeeDTO);
    }
}
