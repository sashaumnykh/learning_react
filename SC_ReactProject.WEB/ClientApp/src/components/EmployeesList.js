import React from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { PageButton } from './pageButton';
import { EditEmployeeButton } from './EditEmployeeButton';
import { useState, useEffect } from 'react';
import { localeRequest } from '../helper/Consts';
import '../styles.css';
import axios from 'axios';
import ReactLoading from 'react-loading';

function EmployeesList() {
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const history = useHistory();

    const [employees, setEmployees] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');

    const [reload, setReload] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(()=>{
        axios('/getall')
            .then(res => {
                setEmployees(res.data);
                setIsLoaded(true);
            })
            .catch(error => console.log(error));
       }, [reload]);

    useEffect(()=>{
        axios('/getall')
            .then(res => {
                setEmployees(res.data);
                setIsLoaded(true);
            })
            .catch(error => console.log(error));
       }, []);

    const onSort = (event, sortKey, sortOrder) => {
        const data = [...employees];
        switch(sortOrder) {
            case 'default': {
                let key = 'employeeId';
                data.sort((a,b) => a[key] - b[key]);
                setEmployees(data);
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

    const handleDelete = (id) => {
        axios.delete('/delete/' + id)
            .then(function (response) {
                console.log(response);
                setReload(reload + 1);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleDateFormat = (dateString, withTime = false) => {
        const options = withTime 
        ? {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: false
          }
        : {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour12: false
          };
        const locale = sessionStorage.getItem(localeRequest);
        const utcDate = new Date(dateString);
        const toShow = new Intl.DateTimeFormat(locale, options).format(utcDate);
        return toShow;
    }

    const renderEmployeesTable = () => {
        let emps = employees.map(employee => 
            (
            <tr hey={employee.name}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{handleDateFormat(employee.bday, false)}</td>
                <td>{employee.salary}</td>
                <td>{handleDateFormat(employee.lastModified, true)}</td>
                <td>
                    <EditEmployeeButton id={employee.employeeId}/>
                </td>
                <td>
                    <button className='page-button' 
                        value={employee.employeeId} 
                        onClick={() => handleDelete(employee.employeeId)}>
                        Delete
                    </button>
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
                        onSort(e, 'name', sortOrder);
                        changeSortOrder();
                    }}>Name</th>
                    <th onClick={e => {
                        onSort(e, 'email', sortOrder);
                        changeSortOrder();
                    }}>Email</th>
                    <th onClick={e => {
                        onSort(e, 'bday', sortOrder);
                        changeSortOrder();
                    }}>Birthday</th>
                    <th onClick={e => {
                        onSort(e, 'salary', sortOrder);
                        changeSortOrder();
                    }}>Salary</th>
                    <th onClick={e => {
                        onSort(e, 'lastModified', sortOrder);
                        changeSortOrder();
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
            {!isLoaded && <ReactLoading className='loading' type={"bars"} color={"grey"} />}
            {isLoaded && <div>
            <div className='buttons'>
                <div className='add'>
                    <button onClick={() => {history.push('/add')}}>Add</button>
                </div>
                <div className='pageNumbers'>
                    {renderPagesButtons(pagesNumber)}
                </div>
            </div>
            {contents}
            </div>}
        </div>
    );
}

export default EmployeesList;