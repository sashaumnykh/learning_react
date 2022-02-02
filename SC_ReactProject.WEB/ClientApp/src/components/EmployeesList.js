import React from 'react';
import { useHistory } from 'react-router-dom';
import { PageButton } from './pageButton';
import { useState, useEffect } from 'react';
import { localeRequest, tokenRequest } from '../helper/Consts';
import '../styles.css';
import axios from 'axios';
import ReactLoading from 'react-loading';

function EmployeesList() {
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const history = useHistory();

    const [employees, setEmployees] = useState([]);
    const [sortOrder, setSortOrder] = useState('default');
    const [sortField, setSortField] = useState('name');
    const [toSort, setToSort] = useState(false);
    
    const [employeesNumber, setEmployeesNumber] = useState(0);

    const [reload, setReload] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const token = sessionStorage.getItem(tokenRequest);
    
    useEffect(()=>{
        axios('/api/getall', {
            params: {
                page: currentPageNumber,
                sort: toSort,
                sortOrder: sortOrder,
                comparer: sortField
            },
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem(tokenRequest)
            }
        })
            .then(res => {
                setEmployees(res.data.employees);
                setEmployeesNumber(res.data.count);
                setIsLoaded(true);
            })
            .catch(error => console.log(error));
    }, [reload]);

    const handleDelete = (id) => {
        const options = {
            method: 'DELETE',
            headers: { Authorization: "Bearer " + token },
            url: '/api/delete/' + id,
        };
        axios(options)
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
            default: {
                alert('sos! 42')
                break;
            }
        }
    }

    const fieldClickHandle = (fieldName) => {
        setSortField(fieldName);
        setToSort(true);
        changeSortOrder();
        setReload(reload + 1);
    }

    const renderEmployeesTable = () => {
        let emps = employees.map(employee => 
            (
            <tr key={employee.name}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{handleDateFormat(employee.bday, false)}</td>
                <td>{employee.salary}</td>
                <td>{handleDateFormat(employee.lastModified, true)}</td>
                <td>
                    <button className='page-button' 
                        value={employee.employeeId} 
                        onClick={() => history.push('/employee/' + employee.employeeId)}>
                        Edit
                    </button>
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

        return(
            <div>
            <table className='employee-table' atia-aria-labelledby='tablelabel'>
                <thead>
                    <tr key='header'>
                        <th onClick={e => {
                            fieldClickHandle('name');
                        }}>Name</th>
                        <th onClick={e => {
                            fieldClickHandle('email');
                        }}>Email</th>
                        <th onClick={e => {
                            fieldClickHandle('bday');
                        }}>Birthday</th>
                        <th onClick={e => {
                            fieldClickHandle('salary');
                        }}>Salary</th>
                        <th onClick={e => {
                            fieldClickHandle('lastModified');
                        }}>Last modified date</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { emps }
                </tbody>
            </table>
            </div>
        );
    };

    const handlePageButtonChange = newPageNumber => {
        setCurrentPageNumber(Number(newPageNumber.target.value));
        setTimeout(function(){
            setReload(reload + 1);
        }, 1000);
    };

    const renderPagesButtons = pagesNumber => {
        const buttons = [];
        for (let i = 0; i < pagesNumber; i++){
            let number = i + 1;
            buttons.push(
                <PageButton key={number}  pageNumber={number} onClick={handlePageButtonChange}/>
            );
        }
        return(buttons);
    };

    const maxEmpNumber = 10;
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