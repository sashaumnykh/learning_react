import React from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { PageButton } from './pageButton';
import { EditEmployeeButton } from './EditEmployeeButton';
import { useState, useEffect } from 'react';
import { employeesRequest } from '../helper/Consts';
import '../styles.css';
import axios from 'axios';

function EmployeesList() {
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const history = useHistory();
    const request = employeesRequest;

    const [employees, setEmployees] = useState([]);
    
    useEffect(()=>{
        axios('/getall')
          .then(res => {
              setEmployees(res.data);
            console.log(res.data)});
       }, []);
    sessionStorage.setItem(request, JSON.stringify(employees));

    const renderEmployeesTable = () => {
        console.log('employees:' + employees);
        
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
                    {
                        employees.map(employee => 
                            (
                            <tr hey={employee.name}>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.bday}</td>
                                <td>{employee.salary}</td>
                                <td>{employee.lastModified}</td>
                                <td>
                                    <EditEmployeeButton id={employee.employeeId}/>
                                </td>
                                <td>{
                                    <button>
                                        Delete
                                    </button>
                                }</td>
                            </tr>
                            )
                        )
                    }
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

    let contents = renderEmployeesTable();
    const maxEmpNumber = 10;
    const employeesNumber = employees.length;
    const pagesNumber = Math.floor(employeesNumber / maxEmpNumber);

    const redirect = () => {
        return <Redirect to='/add'/>
    }

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