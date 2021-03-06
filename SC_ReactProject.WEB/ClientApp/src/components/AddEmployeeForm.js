import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { tokenRequest } from '../helper/Consts';

function AddEmployeeForm() {
    const history = useHistory();
    const token = sessionStorage.getItem(tokenRequest);
    const [redirect, setRedirect] = useState(false);

    const validate = values => {
        const errors = {};
        if (!values.name) {
            errors.name = 'name is required';
        }
        if (!values.email) {
            errors.email = 'email is required';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'invalid email address';
        }
        if (!values.salary) {
            errors.salary = 'salary is required';
        }
        else if (Number.isNaN(parseFloat(values.salary))) {
            errors.salary = 'salary must be a number';
        }
        else if (parseFloat(values.salary) && parseFloat(values.salary) < 0) {
            errors.salary = 'salary cannot be a negative number';
        }
        return errors;
    }
      
    const formik = useFormik({
        initialValues: {
            name: '',
            salary: '',
            email: ''
        },
        validate,
        onSubmit: values => {
            const options = {
                method: 'POST',
                headers: { Authorization: "Bearer " + token },
                url: '/api/employee/',
                data: {
                    name: values.name,
                    salary: values.salary,
                    email: values.email,
                    bday: birthday,
                    lastModified: new Date().toUTCString()
                }
            };
            axios(options)
                .then(function (response) {
                    console.log('add employee: ' + response);
                    setRedirect(true);
                })
                .catch(function (error) {
                 console.log(error);
                });
        }
    });

    const [birthday, setBirthday] = useState(new Date());
    const [isValid, setIsValid] = useState(false);
    const [bdayError, setBdayError] = useState('');

    useEffect( () => {
        (bdayError) ? setIsValid(false) : setIsValid(true);
    }, [bdayError]);

    const handleBdayChange = (date) => {
        if (date !== null) {
            setBirthday(date);
            setBdayError('');
        }
        else {
            setBirthday(date);
            setBdayError('birthay date is required');
        }
    }

    if (redirect) {
        return <Redirect to='/employees' />;
    }
    
    return(
        <form className='f-out' onSubmit={formik.handleSubmit}>
            <div className='f-in'>
                <h1>Add an employee:</h1>
                <div>
                    <label htmlFor="name">name:</label>
                    <input id="name" name="name" type="text" 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}/>
                    {(formik.touched.name && formik.errors.name) ? <div>{formik.errors.name}</div> : null}
                </div>
                <div>
                <label htmlFor="email">email:</label>
                    <input id="email" name="email" type="text" 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}/>
                    {(formik.touched.email && formik.errors.email) ? <div>{formik.errors.email}</div> : null}
                </div>
                <div>
                <label htmlFor="bday">birthday:</label>
                    <DatePicker 
                        selected={birthday} 
                        onChange={date => handleBdayChange(date)}
                        value={birthday ? birthday.toLocaleDateString() : null}
                        isClearable
                        showYearDropdown
                        showMonthDropdown
                    />
                    { (bdayError) && <div>{bdayError}</div>}
                </div>
                <div>
                <label htmlFor="salary">salary:</label>
                    <input id="salary" name="salary" type="text" 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.salary}/>
                    {(formik.touched.salary && formik.errors.salary) ? <div>{formik.errors.salary}</div> : null}
                </div>
                <div className='buttons'>
                    <input type="submit" value="ADD" disabled={!isValid}/>
                    <button onClick={() => {history.push('/employees')}}>CANCEL</button>
                </div>
            </div>
        </form>
    );
}

export default AddEmployeeForm;