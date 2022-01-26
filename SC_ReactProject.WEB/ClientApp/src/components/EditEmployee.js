import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { isLoggedInRequest } from '../helper/Consts';
import axios from 'axios';
// import { useForm } from "react-hook-form";

export function EditEmployee(props) {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        birthday: '',
        salary: null,
        lastModified: ''
    });
    let { id } = useParams();
    useEffect(()=>{
        axios('/get/' + id)
          .then(res => {
            setEmployee(res.data);
            console.log(res.data)}
          );
    //    }, []);
    });
    const history = useHistory();
    const isLoggedIn = sessionStorage.getItem(isLoggedInRequest);

    const saveButtonHandler = () => {

        let now = new Date().toUTCString();

        setEmployee(employee => ({
            ...employee,
            lastModified: now
        }));

        axios({
            method: 'put',
            url: '/employee/' + id,
            data: {
                ...employee,
                lastModified: now
            },
          }).then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        history.push('/')
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
                    <input onChange={e => setEmployee({...employee, name: e.target.value, lastModified: new Date().toString()})} 
                            value={employee.name} />
                </div>
                <div>
                    <label hrmlFor="employeeEmail">Email:</label>
                    <input onChange={e => setEmployee({...employee, email: e.target.value, lastModified: new Date().toString()})} 
                            value={employee.email} />
                </div>
                <div>
                    <label hrmlFor="employeeBirthday">Birthday:</label>
                    <input type="date" 
                            onChange={e => setEmployee({...employee, bday: e.target.value, lastModified: new Date().toString()})} 
                            value={employee.bday} />
                </div>
                <div>
                    <label hrmlFor="employeeSalary">Salary:</label>
                    <input onChange={e => setEmployee({...employee, salary: e.target.value, lastModified: new Date().toString()})} 
                            value={employee.salary} />
                </div>
                <div className='buttons'>
                    <button onClick={saveButtonHandler}>Save</button>
                    <button onClick={() => {history.push('/')}}>Cancel</button>
                </div>
            </div>
        </form>
        
    );
}