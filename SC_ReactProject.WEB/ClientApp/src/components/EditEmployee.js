import React, { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { isLoggedInRequest } from '../helper/Consts';
import axios from 'axios';

export function EditEmployee() {
    const isLoggedIn = sessionStorage.getItem(isLoggedInRequest);
    
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        birthday: '',
        salary: null,
        lastModified: ''
    });

    let { id } = useParams();
    const history = useHistory();

    useEffect(()=>{
        if (!isLoggedIn) {
            history.push('/');
            return null;
        }
        axios('/get/' + id)
          .then(res => {
              setEmployee(res.data);
            console.log(res.data)})
          .catch(error => console.log(error));
       }, []);

    const [nameError, setNameError] = useState('');
    const [nameFieldVisited, setNameFieldVisited] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [emailFieldVisited, setEmailFieldVisited] = useState(false);
    const [salaryError, setSalaryError] = useState('');
    const [salaryFieldVisited, setSalaryFieldVisited] = useState(false);
    const [bdayError, setBdayError] = useState('');
    const [bdayFieldVisited, setBdayFieldVisited] = useState(false);

    const [isInputValid, setIsInputValid] = useState(false);

    useEffect( () => {
        (nameError || emailError || salaryError || bdayError ) ? setIsInputValid(false) : setIsInputValid(true);
    }, [nameError, emailError, salaryError, bdayError]);

    const blurHandle = (e) => {
        switch (e.target.name) {
            case 'name': {
                setNameFieldVisited(true);
                break;
            }
            case 'email': {
                setEmailFieldVisited(true);
                break;
            }
            case 'salary': {
                setSalaryFieldVisited(true);
                break;
            }
            case 'bday': {
                setBdayFieldVisited(true);
                break;
            }
        }
    };

    const handleNameInput = (e) => {
        let name = e.target.value;
        setEmployee({...employee, name: e.target.value, lastModified: new Date().toString()});
        String(name).trim() != ''
            ? setNameError('')
            : setNameError('name cannot be empty.');
    }

    const handleEmailInput = (e) => {
        let email = e.target.value;
        setEmployee({...employee, email: e.target.value, lastModified: new Date().toString()});
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        regexEmail.test(String(email).toLowerCase()) 
            ? setEmailError('')
            : setEmailError('format is incorrect.');
    }

    const handleSalaryInput = (e) => {
        let salary = e.target.value;
        setEmployee({...employee, salary: e.target.value, lastModified: new Date().toString()});
        if (salary.trim() === '') {
            setSalaryError('field cannot be empty.')
        }
        else if (Number.isNaN(parseFloat(salary))) {
            setSalaryError('salary must be a number.')
        }
        else if (parseFloat(salary) && parseFloat(salary) < 0) {
            setSalaryError('salary cannot be a negative number.');
        }
        else {
            setSalaryError('');
        }
    }

    const handleBdayInput = (e) => {
        let bday = e.target.value;
        setEmployee({...employee, bday: e.target.value, lastModified: new Date().toString()});
        setBdayError('');
    }

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
        history.push('/');
    };
    
    return(
        <form className='f-out'>
            <div className='f-in'>
                <h1>Edit:</h1>
                <div>
                    <label hrmlFor="employeeName">Name:</label>
                    <input name="name" onBlur={e => blurHandle(e)} onChange={e => handleNameInput(e)} 
                            value={employee.name} />
                    {(nameFieldVisited && nameError) && <div className='error-message'>{nameError}</div>}
                </div>
                <div>
                    <label hrmlFor="employeeEmail">Email:</label>
                    <input name="email" onBlur={e => blurHandle(e)} onChange={e => handleEmailInput(e)} 
                            value={employee.email} />
                    {(emailFieldVisited && emailError) && <div className='error-message'>{emailError}</div>}
                </div>
                <div>
                    <label hrmlFor="employeeBirthday">Birthday:</label>
                    <input name="bday" type="date" onBlur={e => blurHandle(e)} 
                            onChange={e => handleBdayInput(e)} 
                            value={employee.bday} />
                    {(bdayFieldVisited && bdayError) && <div className='error-message'>{bdayError}</div>}
                </div>
                <div>
                    <label hrmlFor="employeeSalary">Salary:</label>
                    <input name="salary" onBlur={e => blurHandle(e)} onChange={e => handleSalaryInput(e)} 
                            value={employee.salary} />
                    {(salaryFieldVisited && salaryError) && <div className='error-message'>{salaryError}</div>}
                </div>
                <div className='buttons'>
                    <button disabled={!isInputValid} onClick={saveButtonHandler}>Save</button>
                    <button onClick={() => {history.push('/')}}>Cancel</button>
                </div>
            </div>
        </form>
        
    );
}