import React, { useState, useContext } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { isLoggedInRequest, employeesRequest } from '../helper/Consts';

export function EditEmployee(props) {
    const history = useHistory();
    const isLoggedIn = sessionStorage.getItem(isLoggedInRequest);
    let { id } = useParams();
    id = 1;

    const employees = JSON.parse(sessionStorage.getItem(employeesRequest));

    const testEmployee = {
        name: 'test',
        email: 'test@mail.ru',
        salary: 1000,
        birthday: '17.02.2000'
    };
    const employee = employees ? employees[id] : testEmployee;

    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        birthday: '',
        salary: null,
        lastModified: '' 
    });

    const saveButtonHandler = () => {
        // api call
        history.push('/');
    };

    /* if (!isLoggedIn) {
        history.push('/');
        return(
            null
        );
    }
    */

    return(
        <form className='f-out'>
            <div className='f-in'>
                <h1>Edit:</h1>
                <div>
                    <label hrmlFor="employeeName">Name:</label>
                    <input onChange={e => setNewUser({...newUser, name: e.target.value})} 
                            value={employee.name} />
                </div>
                <div>
                    <label hrmlFor="employeeEmail">Email:</label>
                    <input onChange={e => setNewUser({...newUser, email: e.target.value})} 
                            value={employee.email} />
                </div>
                <div>
                    <label hrmlFor="employeeBirthday">Birthday:</label>
                    <input type="date" 
                            onChange={e => setNewUser({...newUser, birthday: e.target.value})} 
                            value={employee.birthday} />
                </div>
                <div>
                    <label hrmlFor="employeeSalary">Salary:</label>
                    <input onChange={e => setNewUser({...newUser, salary: e.target.value})} 
                            value={employee.salary} />
                </div>
                <button onClick={saveButtonHandler}>Save</button>
            </div>
            {employees}
        </form>
        
    );
}