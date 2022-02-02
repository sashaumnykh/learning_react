using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SC_ReactProject.Core.EmployeeModule.Services;
using SC_ReactProject.WEB.Models;
using SC_ReactProject.Core.EmployeeModule;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using SC_ReactProject.Core.Common;

namespace SC_ReactProject.WEB.Controllers
{
    [ApiController]
    [Authorize]
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
                bday: dto.bday,
                lastModified: dto.lastModified
            );
        }

        public EmployeeDTO ToDTO(EmployeeVM vm)
        {
            return new EmployeeDTO(
                employeeId: vm.employeeId,
                name: vm.name,
                email: vm.email,
                salary: vm.salary,
                bday: vm.bday,
                lastModified: vm.lastModified
            );
        }

        [HttpGet]
        [Route("/api/getall")]
        public GetAllResponse GetAll(int page = 0, bool sort = false, string sortOrder = "default", string comparer = "name")
        {
            GetAllResponse resp = _employeeService.GetAll(page, sort, sortOrder, comparer);
            return resp;
        }

        [HttpGet]
        [Route("/api/get/{id}")]
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
        [Route("/api/employee/")]
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
        [Route("/api/employee/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Update(EmployeeVM employee)
        {
            EmployeeDTO emp = ToDTO(employee);
            _employeeService.Update(emp);
            return Ok();
        }

        [HttpDelete]
        [Route("/api/delete/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Delete(int id)
        {
            _employeeService.Delete(id);
            return Ok();
        }
    }
}