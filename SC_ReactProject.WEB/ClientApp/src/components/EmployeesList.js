import React, { Component } from 'react';
import { PageButton } from './pageButton';

export class EmployeesList extends Component {
    // async populateEmployeeData() {
    //     const response = await fetch('employees');
    //     const data = await response.json();
    //     this.emps = data;
    //     console.log(data);
    // }
    currentPageNumber = 1;

    static handlePageButtonChange(newPageNumber){
        this.currentPageNumber = newPageNumber;
    }

    static renderPagesButtons(pagesNumber){
        const buttons = [];
        for (let i = 0; i < pagesNumber; i++){
            let number = i + 1;
            buttons.push(
                <PageButton pageNumber={number}/>
            );
        }
        return(buttons);
    }

    static renderEmployeesTable(employees) {
        const maxEmpNumber = 10;
        const employeesNumber = employees.length;
        const currentPageNumber = 1;
        const pagesNumber = Math.floor(employeesNumber / maxEmpNumber);
        const final = [];
        for (let i = currentPageNumber - 1; i < currentPageNumber * 10; i++){
            const employee = employees[i];
            final.push(
                <tr hey={employee.name}>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.bday}</td>
                    <td>{employee.salary}</td>
                    <td>{employee.lastModified}</td>
                </tr>
            );
        }
        return(
            <div>
            <table className='table table-striped' atia-aria-labelledby='tablelabel'>
                <thead>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Birthday</th>
                    <th>Salary</th>
                    <th>Last modified date</th>
                </thead>
                <tbody>
                    {final}
                </tbody>
            </table>
            {this.renderPagesButtons(pagesNumber)}
            </div>
        );
    }

    static getEmployeesList(number){
        const employees = [];
        for(let i = 0; i < number; i++){
            const num = i.toString();
            employees.push(
            {
                name: num,
                email: num + "@mail.ru",
                salary: i,
                bday: num,
            }
            );
        }
        return employees;
    }

    render() {
        let employees = [
            {
                name: "Sasha",
                email: "sasha@mail.ru",
                salary: 1000,
                bday: "17th of march",
            },
            {
                name: "Polina",
                email: "polina@mail.ru",
                salary: 2000,
                bday: "9th of march",
            }
        ];
        let newEmployees = EmployeesList.getEmployeesList(20);
        // employees = fetch("/employees");
        let contents = EmployeesList.renderEmployeesTable(newEmployees);
        return(
            <div>
                {contents}
            </div>
        );
    }
}