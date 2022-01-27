import React, { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { isLoggedInRequest } from '../helper/Consts';
import { useFormik } from 'formik';
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
            })
          .catch(error => console.log(error));
       }, []);

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
            name: employee.name,
            bday: employee.bday,
            salary: employee.salary,
            email: employee.email
        },
        validate,
        onSubmit: saveButtonHandler
    });
    
    return(
        <form className='f-out' onSubmit={formik.handleSubmit}>
            <div className='f-in'>
                <h1>Edit:</h1>
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
                    <input type="submit" value="SAVE"/>
                    <button onClick={() => {history.push('/')}}>CANCEL</button>
                </div>
            </div>
        </form>
        
    );

}