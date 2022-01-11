import React, { Component } from 'react';

export class EmployeesList extends Component {
    static renderEmployeesTable(employees) {
        return(
            <table className='table table-striped' atia-aria-labelledby='tablelabel'>
                <thead>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Birthday</th>
                    <th>Salary</th>
                    <th>Last modified date</th>
                </thead>
                <tbody>
                    {employees.map(employee =>
                        <tr hey={employee.name}>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.bday}</td>
                            <td>{employee.salary}</td>
                            <td>{employee.lastModified}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
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
        ]
        let contents = EmployeesList.renderEmployeesTable(employees);

        return(
            <div>
                {contents}
            </div>
        );
    }
}