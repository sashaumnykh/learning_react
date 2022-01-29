import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { isLoggedInRequest } from '../helper/Consts';
import { Formik, Form, Field, ErrorMessage } from 'formik';
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

    const [isLoaded, setIsLoaded] = useState(false);

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
              setIsLoaded(true);
            })
          .catch(error => console.log(error));
       }, [isLoaded]);

    const saveButtonHandler = (values) => {
        let now = new Date().toUTCString();

        setEmployee({
            name: values.name,
            email: values.email,
            salary: values.salary,
            bday: values.bday,
            lastModified: now
        });

        axios({
            method: 'put',
            url: '/employee/' + id,
            data: {
                ...values,
                employeeId: id,
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
    
    return(
        <div>
            <div className='f-out'>
                <div className='f-in'> 
                    <h1>Edit:</h1>
                    
                    <Formik
                        initialValues={{
                            name: employee.name,
                            bday: employee.bday,
                            salary: employee.salary,
                            email: employee.email
                        }}
                        validate={validate}
                        enableReinitialize={true} 
                        onSubmit={values => saveButtonHandler(values)}
                    >
                        <Form>
                            <div>
                                <label htmlFor="name">name:</label>
                                <Field id="name" name="name"/>
                                <div>
                                    <ErrorMessage name="name" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email">email:</label>
                                <Field id="email" name="email"/>
                                <div>
                                    <ErrorMessage name="email" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="bday">birthday:</label>
                                <Field id="bday" name="bday" type="date"/>
                                <div>
                                    <ErrorMessage name="bday" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="salary">salary:</label>
                                <Field id="salary" name="salary"/>
                                <div>
                                    <ErrorMessage name="salary" />
                                </div>
                            </div>
                            <div className='buttons'>
                                <button type="submit">SAVE</button>
                                <button onClick={() => {history.push('/')}}>CANCEL</button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}