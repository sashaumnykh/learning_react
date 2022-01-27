import React, { Component, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';

function AddEmployeeForm() {
    const history = useHistory();

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
        if (!values.bday) {
            errors.bday = 'bday is required';
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
            bday: '',
            salary: '',
            email: ''
        },
        validate,
        onSubmit: values => {
            axios.post('/employee/', {
                name: values.name,
                salary: values.salary,
                email: values.email,
                bday: values.bday,
                lastModified: new Date().toUTCString()
            })
              .then(function (response) {
                console.log('add employee: ' + response);
              })
              .catch(function (error) {
                console.log(error);
              });
            history.push('/');
          }
    });

    const redirect = () => {
        history.push('/');
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
                    <input id="bday" name="bday" type="date" 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.bday}/>
                    {(formik.touched.bday && formik.errors.bday) ? <div>{formik.errors.bday}</div> : null}
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
                    <input type="submit" value="ADD"/>
                    <button onClick={() => {history.push('/')}}>CANCEL</button>
                </div>
            </div>
        </form>
        
    );
}

export default AddEmployeeForm;