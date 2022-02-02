import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Redirect } from "react-router-dom";
import { isLoggedInRequest, tokenRequest } from '../helper/Consts';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import ReactLoading from 'react-loading';
import DatePicker from "react-datepicker";

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

    const [redirect, setRedirect] = useState(false);

    const [birthday, setBirthday] = useState(new Date());
    const [bdayError, setBdayError] = useState('');
    
    const token = sessionStorage.getItem(tokenRequest);

    useEffect(()=>{
        if (!isLoggedIn) {
            history.push('/');
            return null;
        }
        axios('/api/get/' + id,
        {
            headers: {
                Authorization: "Bearer " + token
             }
        })
            .then(res => {
                setEmployee(res.data);
                setBirthday(new Date(res.data.bday));
                setIsLoaded(true);
            })
            .catch(error => console.log(error));
            // eslint-disable-next-line
        }, []);

    const saveButtonHandler = (values) => {
        let now = new Date().toUTCString();

        setEmployee({
            name: values.name,
            email: values.email,
            salary: values.salary,
            lastModified: now
        });

        axios({
            method: 'put',
            headers: {
                Authorization: "Bearer " + token
            },
            url: '/api/employee/' + id,
            data: {
                ...values,
                employeeId: id,
                bday: birthday,
                lastModified: now
            },
            }).then(function (response) {
                console.log(response);
                setRedirect(true);
            })
            .catch(function (error) {
                console.log(error);
            });
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
        <div>
            <div className='f-out'>
                <div className='f-in'>
                    <h1>Edit:</h1>
                    {!isLoaded && <ReactLoading className='loading' type={"bars"} color={"grey"} />}
                    { isLoaded && <Formik
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
                                <Field id="salary" name="salary"/>
                                <div>
                                    <ErrorMessage name="salary" />
                                </div>
                            </div>
                            <div className='buttons'>
                                <button type="submit">SAVE</button>
                                <button onClick={() => {history.push('/employees')}}>CANCEL</button>
                            </div>
                        </Form>
                    </Formik>}
                </div>
            </div>
        </div>
    );
}