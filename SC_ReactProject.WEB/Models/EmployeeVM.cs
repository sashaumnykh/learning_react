using System.ComponentModel.DataAnnotations;

namespace SC_ReactProject.WEB.Models
{
    public class EmployeeVM
    {
        public EmployeeVM(int employeeId, string name, string email, string salary, string bday)
        {
            this.employeeId = employeeId;
            this.name = name;
            this.email = email;
            this.salary = salary;
            this.bday = bday;
        }
        [Key]
        public int employeeId { get; set; }
        public string name { get; set; }
        [EmailAddress]
        public string email { get; set; }
        public string salary { get; set; }
        public string bday { get; set; }
        public string lastModified { get; set; }
    }
}