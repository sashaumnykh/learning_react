using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SC_ReactProject.Core.EmployeeModule.Services;
using SC_ReactProject.WEB.Models;
using SC_ReactProject.Core.EmployeeModule;
using Microsoft.AspNetCore.Http;

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

        public EmployeeVM FromDTO(EmployeeDTO dto)
        {
            return new EmployeeVM(
                employeeId: dto.employeeId,
                name: dto.name,
                email: dto.email,
                salary: dto.salary,
                bday: dto.bday
            );
        }

        public EmployeeDTO ToDTO(EmployeeVM vm)
        {
            return new EmployeeDTO(
                employeeId: vm.employeeId,
                name: vm.name,
                email: vm.email,
                salary: vm.salary,
                bday: vm.bday
            );
        }

        [HttpGet]
        [Route("/getall")]
        public IEnumerable<EmployeeVM> GetAll()
        {
            IEnumerable<EmployeeDTO> employees = _employeeService.GetAll();
            List<EmployeeVM> result = new List<EmployeeVM>();
            foreach (EmployeeDTO employee in employees)
            {
                result.Add(FromDTO(employee));
            }
            return result;
        }

        [HttpGet]
        [Route("/get/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult GetById(int id)
        {
            EmployeeVM emp = null;
            var employee = _employeeService.Get(id);
            emp = FromDTO(employee);
            return Ok(emp);
        }

        [HttpPost]
        [Route("/employee/")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Create([FromBody] EmployeeVM toCreate)
        {
            int? id = null;

            var employee = ToDTO(toCreate);
            id = _employeeService.Create(employee);
            return Ok(id);
        }

        [HttpPut]
        [Route("/employee/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Update(EmployeeVM employee)
        {
            EmployeeDTO emp = ToDTO(employee);
            _employeeService.Update(emp);
            return Ok();
        }

        [HttpDelete]
        [Route("/delete/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Delete(int id)
        {
            _employeeService.Delete(id);
            return Ok();
        }
    }
}