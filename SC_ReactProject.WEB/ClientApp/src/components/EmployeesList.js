import React from 'react';
import { useHistory } from 'react-router-dom';
import { PageButton } from './pageButton';
import { EditEmployeeButton } from './EditEmployeeButton';
import { useState } from 'react';
import '../styles.css';

function EmployeesList() {
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const history = useHistory();

    const getEmployeesList = number => {
        const employees = [];
        for (let i = 0; i < number; i++ ) {
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
    };

    const renderEmployeesTable = employees => {
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
                        <td>
                            <EditEmployeeButton id={i}/>
                        </td>
                        <td>{
                            <button>
                                Delete
                            </button>
                        }</td>
                    </tr>
            );
        }
        return(
            <div>
            <table className='employee-table' atia-aria-labelledby='tablelabel'>
                <thead>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Birthday</th>
                    <th>Salary</th>
                    <th>Last modified date</th>
                    <th></th>
                    <th></th>
                </thead>
                <tbody>
                    {final}
                </tbody>
            </table>
            </div>
        );
    };

    const handlePageButtonChange = newPageNumber => {
        setCurrentPageNumber(newPageNumber.target.value);
    };

    const renderPagesButtons = pagesNumber => {
        const buttons = [];
        for (let i = 0; i < pagesNumber; i++){
            let number = i + 1;
            buttons.push(
                <PageButton pageNumber={number} onClick={handlePageButtonChange}/>
            );
        }
        return(buttons);
    };

    let employees = getEmployeesList(20);
    // employees = fetch("/employees");
    let contents = renderEmployeesTable(employees);

    const maxEmpNumber = 10;
    const employeesNumber = employees.length;
    const pagesNumber = Math.floor(employeesNumber / maxEmpNumber);

    return(
        <div className='employee-list'>
            <h1>Employees:</h1>
            {contents}
            <div className='buttons'>
                <div className='add'>
                    <button onClick={() => {history.push('/add')}}>Add</button>
                </div>
                <div className='pageNumbers'>
                    {renderPagesButtons(pagesNumber)}
                </div>
            </div>
        </div>
    );
}

export default EmployeesList;