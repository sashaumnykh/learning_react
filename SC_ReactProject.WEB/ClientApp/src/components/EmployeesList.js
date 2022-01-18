import React, { Component } from 'react';
import { PageButton } from './pageButton';

export class EmployeesList extends Component {
    constructor(props){
        super(props);
        this.state= {
            currentPageNumber: 1
        };
        this.handlePageButtonChange = this.handlePageButtonChange.bind(this);
    }

    handlePageButtonChange(newPageNumber){
        this.setState(
            { currentPageNumber: newPageNumber.target.value }
        )
    }

    renderPagesButtons(pagesNumber){
        const buttons = [];
        for (let i = 0; i < pagesNumber; i++){
            let number = i + 1;
            buttons.push(
                <PageButton pageNumber={number} onClick={this.handlePageButtonChange}/>
            );
        }
        return(buttons);
    }

    renderEmployeesTable(employees) {
        const maxEmpNumber = 10;
        const employeesNumber = employees.length;
        const currentPageNumber = this.state.currentPageNumber;
        const pagesNumber = Math.floor(employeesNumber / maxEmpNumber);
        const final = [];
        for (let i = (currentPageNumber - 1) * 10; i < currentPageNumber * 10; i++){
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
                id: i,
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
        let contents = this.renderEmployeesTable(newEmployees);
        return(
            <div>
                {contents}
            </div>
        );
    }
}