using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SC_ReactProject.Core.EmployeeModule
{
    public class EmployeeDTO
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string BDay { get; set; }
        public string Salary { get; set; }
        public string LastModifiedDate { get; set; }
    }
}