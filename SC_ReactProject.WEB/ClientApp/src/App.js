import React, { useState } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import EmployeesList from './components/EmployeesList';
import LogInForm from './components/LogInForm';
import { isLoggedInRequest, tokenRequest } from './helper/Consts';
import { AddEmployeeRoute } from './components/AddEmployeeRoute';
import { EditEmployeeRoute } from './components/EditEmployeeRoute';
import axios from 'axios';

import './styles.css'
import { RedirectHelper, RouteHelper } from './helper/RouteHelper';

export default function App() {

    const userLocale =
    navigator.languages && navigator.languages.length
        ? navigator.languages[0]
        : navigator.language;

    sessionStorage.setItem('locale', userLocale);

    const history = useHistory();

    const isLoggedIn = sessionStorage.getItem(isLoggedInRequest);

    const [reload, setReload] = useState(0);
    const [loginError, setLoginError] = useState('');

    const login = (login, password) => {
        axios({
            method: 'post',
            url: '/api/login/',
            data: {
                login: login,
                password: password
            },
        }).then(function (response) {
            sessionStorage.setItem(tokenRequest, response.data);
            sessionStorage.setItem(isLoggedInRequest, true);
            setReload(reload + 1);
            history.push('/employees');
        })
        .catch(function (error) {
            setLoginError('login or password is incorrect.')
            console.log(error);
        });
    }

    return (
        <div>
            <Route exact path="/" >
                <LogInForm login={login} error={loginError}/>
            </Route>
            <RouteHelper path='/employees' component={EmployeesList} />
            <RouteHelper path="/employee/:id" component={EditEmployeeRoute} />
            <RouteHelper exact path="/add" component={AddEmployeeRoute} />
        </div>
    );
}