import React from 'react';
import { isLoggedInRequest } from '../helper/Consts';
import AddEmployeeForm from './AddEmployeeForm';
import { Route, Redirect } from 'react-router-dom';

export function AddEmployeeRoute() {
    const isLoggedIn = sessionStorage.getItem(isLoggedInRequest);
    return (
        <Route render={() => {
            if (!isLoggedIn) {
                return <Redirect to='/' />
            }
            return <AddEmployeeForm/>
        }} />
    );
}