import React from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { PageButton } from './pageButton';
import { EditEmployeeButton } from './EditEmployeeButton';
import { DeleteEmployeeButton } from './DeleteEmployeeButton';
import { useState, useEffect } from 'react';
import '../styles.css';
import axios from 'axios';

function EmployeesList() {
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const history = useHistory();

    const [employees, setEmployees] = useState([]);
    const [sortOrder, setSortOrder] = useState('default');
    
    useEffect(()=>{
        axios('/getall')
            .then(res => {
                setEmployees(res.data);
            })
            .catch(error => console.log(error));
       }, []);

    const onSort = (event, sortKey, sortOrder) => {
        const data = [...employees];
        switch(sortOrder) {
            case 'default': {
                break;
            }
            case 'asc': {
                data.sort((a,b) => a[sortKey].localeCompare(b[sortKey]));
                setEmployees(data);
                break;
            }
            case 'desc': {
                data.sort((a,b) => -a[sortKey].localeCompare(b[sortKey]));
                setEmployees(data);
                break;
            }
        }
        setEmployees(data);
    }

    const handleLastModified = (dateString) => {
        const utcDate = new Date(dateString);
        return utcDate.toLocaleString();
    }

    const renderEmployeesTable = () => {
        let emps = employees.map(employee => 
            (
            <tr hey={employee.name}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.bday}</td>
                <td>{employee.salary}</td>
                <td>{handleLastModified(employee.lastModified)}</td>
                <td>
                    <EditEmployeeButton id={employee.employeeId}/>
                </td>
                <td>
                    <DeleteEmployeeButton id={employee.employeeId} />
                </td>
            </tr>
            )
        );

        const changeSortOrder = () => {
            switch(sortOrder) {
                case 'default': {
                    setSortOrder('asc');
                    break;
                }
                case 'asc': {
                    setSortOrder('desc');
                    break;
                }
                case 'desc': {
                    setSortOrder('default');
                    break;
                }
            }
        }

        return(
            <div>
            <table className='employee-table' atia-aria-labelledby='tablelabel'>
                <thead>
                    <th onClick={e => {
                        changeSortOrder();
                        onSort(e, 'name', sortOrder);
                    }}>Name</th>
                    <th onClick={e => {
                        changeSortOrder();
                        onSort(e, 'email', sortOrder);
                    }}>Email</th>
                    <th onClick={e => {
                        changeSortOrder();
                        onSort(e, 'bday', sortOrder);
                    }}>Birthday</th>
                    <th onClick={e => {
                        changeSortOrder();
                        onSort(e, 'salary', sortOrder);
                    }}>Salary</th>
                    <th onClick={e => {
                        changeSortOrder();
                        onSort(e, 'lastModified', sortOrder);
                    }}>Last modified date</th>
                    <th></th>
                    <th></th>
                </thead>
                <tbody>
                    {
                        emps.slice((currentPageNumber - 1) * 10, currentPageNumber * 10)
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

    const maxEmpNumber = 10;
    const employeesNumber = Object.keys(employees).length;
    const pagesNumber = Math.ceil(employeesNumber / maxEmpNumber);
    let contents = renderEmployeesTable();

    return(
        <div className='employee-list'>
            <h1>Employees:</h1>
            <div className='buttons'>
                <div className='add'>
                    <button onClick={() => {history.push('/add')}}>Add</button>
                </div>
                <div className='pageNumbers'>
                    {renderPagesButtons(pagesNumber)}
                </div>
            </div>
            {contents}
        </div>
    );
}

export default EmployeesList;