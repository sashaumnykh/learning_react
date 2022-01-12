import React, { Component } from 'react';

export class EmployeesList extends Component {
    async populateEmployeeData() {
        const response = await fetch('employees');
        const data = await response.json();
        this.emps = data;
        console.log(data);
      }

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
            },
            {
                name: "1",
                email: "1@mail.ru",
                salary: 1,
                bday: "1",
            },
            {
                name: "2",
                email: "2@mail.ru",
                salary: 2,
                bday: "2",
            },
            {
                name: "3",
                email: "3@mail.ru",
                salary: 3,
                bday: "3",
            },
            {
                name: "4",
                email: "4@mail.ru",
                salary: 4,
                bday: "4",
            },
            {
                name: "5",
                email: "5@mail.ru",
                salary: 5,
                bday: "5",
            },
            {
                name: "6",
                email: "6@mail.ru",
                salary: 6,
                bday: "6",
            },
            {
                name: "7",
                email: "7@mail.ru",
                salary: 7,
                bday: "7",
            },
            {
                name: "8",
                email: "8@mail.ru",
                salary: 8,
                bday: "8",
            },
            {
                name: "9",
                email: "9@mail.ru",
                salary: 9,
                bday: "9",
            }
        ];
        // employees = fetch("/employees");
        let contents = EmployeesList.renderEmployeesTable(employees);

        return(
            <div>
                {contents}
            </div>
        );
    }
}