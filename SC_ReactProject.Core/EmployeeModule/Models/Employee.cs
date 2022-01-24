using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace SC_ReactProject.Core.EmployeeModule
{
    public class Employee
    {
        public Employee(int employeeId, string name, string email, string salary, string bday, string lastModified)
        {
            this.employeeId = employeeId;
            this.name = name;
            this.email = email;
            this.salary = salary;
            this.bday = bday;
            this.lastModified = lastModified;
        }
        [Key]
        public int employeeId { get; set; }
        public string name { get; set; }
        [EmailAddress]
        public string email { get; set; }
        public string bday { get; set; }
        public string salary { get; set; }
        public string lastModified { get; set; }
    }
}