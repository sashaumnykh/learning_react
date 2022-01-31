﻿import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import EmployeesList from './components/EmployeesList';
import LogInForm from './components/LogInForm';
import { isLoggedInRequest, tokenRequest } from './helper/Consts';
import { AddEmployeeRoute } from './components/AddEmployeeRoute';
import { EditEmployeeRoute } from './components/EditEmployeeRoute';
import axios from 'axios';

import './styles.css'

export default function App() {

    const userLocale =
    navigator.languages && navigator.languages.length
        ? navigator.languages[0]
        : navigator.language;

    sessionStorage.setItem('locale', userLocale);

    const isLoggedIn = sessionStorage.getItem(isLoggedInRequest);

    const [reload, setReload] = useState(0);

    const login = (login, password) => {
        axios({
            method: 'post',
            url: '/login/',
            data: {
                login: login,
                password: password
            },
        }).then(function (response) {
            sessionStorage.setItem(tokenRequest, response.data);
            sessionStorage.setItem(isLoggedInRequest, true);
            setReload(reload + 1);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div>
            <Route path="/employee/:id" component={EditEmployeeRoute} />
            <Route path="/add" component={AddEmployeeRoute} />
            <Route exact path="/" >
                {isLoggedIn 
                ? ( <div><EmployeesList /></div>) 
                : <LogInForm login={login}/>}
            </Route>
            <Redirect to="/" />
        </div>
    );
}