import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import { isLoggedInRequest } from '../helper/Consts';
import axios from 'axios';

function AddEmployeeForm() {
    // const [newUser, setNewUser] = useState({
    //     name: '',
    //     email: '',
    //     birthday: '',
    //     salary: null,
    //     lastModified: '' 
    // });
    const history = useHistory();
    // const isLoggedIn = sessionStorage.getItem(isLoggedInRequest);

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('field cannot be empty.');
    const [nameFieldVisited, setNameFieldVisited] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('field cannot be empty.');
    const [emailFieldVisited, setEmailFieldVisited] = useState(false);
    const [salary, setSalary] = useState('');
    const [salaryError, setSalaryError] = useState('field cannot be empty.');
    const [salaryFieldVisited, setSalaryFieldVisited] = useState(false);
    const [bday, setBday] = useState('');
    const [bdayError, setBdayError] = useState('field cannot be empty.');
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
            default: {
                alert('sos!')
                break;
            }
        }
    };

    const addButtonHandler = () => {
        axios.post('/employee/', {
            name: name,
            salary: salary,
            email: email,
            bday: bday,
            lastModified: new Date().toUTCString()
        })
          .then(function (response) {
            console.log('add employee: ' + response);
          })
          .catch(function (error) {
            console.log(error);
          });
        history.push('/');
    };

    const handleNameInput = (e) => {
        let name = e.target.value;
        setName(name);
        String(name).trim() !== ''
            ? setNameError('')
            : setNameError('name cannot be empty.');
    }

    const handleEmailInput = (e) => {
        let email = e.target.value;
        setEmail(email);
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        regexEmail.test(String(email).toLowerCase()) 
            ? setEmailError('')
            : setEmailError('format is incorrect.');
    }

    const handleSalaryInput = (e) => {
        let salary = e.target.value;
        setSalary(salary);
        salary >= 0
            ? setSalaryError('')
            : setSalaryError('salary cannot be a negative number.');
    }

    const handleBdayInput = (e) => {
        let bday = e.target.value;
        setBday(bday);
        setBdayError('');
    }
    
    // if (!isLoggedIn) {
    //     history.push('/');
    //     return(
    //         null
    //     );
    // }
    
    return(
        <form className='f-out' onSubmit={addButtonHandler}>
            <div className='f-in'>
                <h1>Add an employee:</h1>
                <div>
                    <label>Name:</label>
                    <input name="name" onBlur={e => blurHandle(e)} onChange={e => handleNameInput(e)} 
                            value={name} />
                    {(nameFieldVisited && nameError) && <div className='error-message'>{nameError}</div>}
                </div>
                <div>
                    <label>Email:</label>
                    <input name="email" onBlur={e => blurHandle(e)} onChange={e => handleEmailInput(e)} 
                            value={email} />
                    {(emailFieldVisited && emailError) && <div className='error-message'>{emailError}</div>}
                </div>
                <div>
                    <label>Birthday:</label>
                    <input name="bday" type="date"  onBlur={e => blurHandle(e)}
                            onChange={e => handleBdayInput(e)} 
                            value={bday} />
                    {(bdayFieldVisited && bdayError) && <div className='error-message'>{bdayError}</div>}
                </div>
                <div>
                    <label>Salary:</label>
                    <input name="salary" onBlur={e => blurHandle(e)} onChange={e => handleSalaryInput(e)} 
                            value={salary} />
                    {(salaryFieldVisited && salaryError) && <div className='error-message'>{salaryError}</div>}
                </div>
                <input type="submit" value="Add" disabled={!isInputValid}/>
            </div>
        </form>
        
    );
}

export default AddEmployeeForm;