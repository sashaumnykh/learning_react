using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SC_ReactProject.Core.Common;

namespace SC_ReactProject.Core.EmployeeModule.Services
{
    public interface IEmployeeService
    {
        EmployeeDTO Get(int id);
        GetAllResponse GetAll(int page = 0, bool sort = false, string sortOrder = "default", string comparer = "name");
        int Create(EmployeeDTO employeeDTO);
        void Delete(int id);
        void Update(EmployeeDTO employeeDTO);
    }
}
