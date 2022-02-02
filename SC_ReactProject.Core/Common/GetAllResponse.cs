using SC_ReactProject.Core.EmployeeModule;
using System.Collections.Generic;

namespace SC_ReactProject.Core.Common
{
    public class GetAllResponse
    {
        public GetAllResponse(IEnumerable<Employee> employees, int count)
        {
            this.employees = employees;
            this.count = count;
        }
        public IEnumerable<Employee> employees { get; set; }
        public int count { get; set; }
    }
}