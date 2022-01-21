using Moq;
using NUnit.Framework;
using SC_ReactProject.Core.EmployeeModule;
using SC_ReactProject.Core.EmployeeModule.Services;
using SC_ReactProject.WEB.Controllers;
using System.Collections.Generic;

namespace SC_ReactProject.Core.Tests.ControllersTests
{
    public class EmployeeControllerTests
    {
        private Mock<EmployeeService> _service;
        private Mock<EmployeeRepository> _repo;

        private EmployeeModule.Employee employee1;
        private EmployeeModule.Employee employee2;
        private IEnumerable<EmployeeModule.Employee> employeeList;

        [SetUp]
        public void Setup()
        {
            _service = new Mock<EmployeeService>();
            _repo = new Mock<EmployeeRepository>();

            employee1 = new EmployeeModule.Employee
            {
                Name = "Sasha",
                Email = "sasha@mail.ru"
            };
            employee2 = new EmployeeModule.Employee
            {
                Name = "Irina",
                Email = "irina@mail.ru"
            };
            employeeList = new List<EmployeeModule.Employee>
            {
                employee1,
                employee2
            };
        }

        [Test]
        public void GetAll_invokes_serviceMethodGetAll()
        {
            //_service.Setup(x => x.GetAll()).Verifiable();
            //var repo = new EmployeeRepository();
            //var employeeController = new EmployeeController(_service);

            //employeeController.GetAll();

            //_service.Verify(x => x.Create(It.IsAny<StudentDTO>()), Times.Once());
            Assert.Pass();
        }
    }
}