using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SC_ReactProject.Core.EmployeeModule.Services;
using SC_ReactProject.WEB.Models;
using SC_ReactProject.Core.EmployeeModule;

namespace SC_ReactProject.WEB.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : ControllerBase
    {
        private IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet]
        [Route("/getall")]
        public IEnumerable<Employee> GetAll()
        {
            return _employeeService.GetAll();
        }

        [HttpGet]
        [Route("/get")]
        public IEnumerable<EmployeeVM> Get()
        {
            Console.WriteLine("in method");
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new EmployeeVM
            {
                name = rng.Next(-20, 55).ToString(),
                email = rng.Next(-20, 55).ToString(),
                salary = rng.Next(-20, 55).ToString()
            })
            .ToArray();
        }
    }
}