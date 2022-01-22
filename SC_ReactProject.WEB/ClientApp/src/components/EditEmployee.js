import React, { useState, useContext } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { isLoggedInRequest, employeesRequest } from '../helper/Consts';

export function EditEmployee(props) {
    const history = useHistory();
    const isLoggedIn = sessionStorage.getItem(isLoggedInRequest);
    let { id } = useParams();
    const request = employeesRequest;

    const employees = JSON.parse(sessionStorage.getItem(request));
    console.log(employees);


    const testEmployee = {
        name: 'test',
        email: 'test@mail.ru',
        salary: 1000,
        birthday: '17.02.2000'
    };
    //const employee = employees ? employees[id] : testEmployee;

    const [employee, setEmployee] = useState(employees[id]);

    const saveButtonHandler = () => {
        // api call
        const updatedEmployees = [...employees];
        updatedEmployees[id] = employee;
        sessionStorage.setItem(request, updatedEmployees);
        console.log(JSON.parse(sessionStorage.getItem(request)));
        history.push('/');
    };

    if (!isLoggedIn) {
        history.push('/');
        return(
            null
        );
    }
    
    return(
        <form className='f-out'>
            <div className='f-in'>
                <h1>Edit:</h1>
                <div>
                    <label hrmlFor="employeeName">Name:</label>
                    <input onChange={e => setEmployee({...employee, name: e.target.value})} 
                            value={employee.name} />
                </div>
                <div>
                    <label hrmlFor="employeeEmail">Email:</label>
                    <input onChange={e => setEmployee({...employee, email: e.target.value})} 
                            value={employee.email} />
                </div>
                <div>
                    <label hrmlFor="employeeBirthday">Birthday:</label>
                    <input type="date" 
                            onChange={e => setEmployee({...employee, bday: e.target.value})} 
                            value={employee.bday} />
                </div>
                <div>
                    <label hrmlFor="employeeSalary">Salary:</label>
                    <input onChange={e => setEmployee({...employee, salary: e.target.value})} 
                            value={employee.salary} />
                </div>
                <button onClick={saveButtonHandler}>Save</button>
            </div>
        </form>
        
    );
}