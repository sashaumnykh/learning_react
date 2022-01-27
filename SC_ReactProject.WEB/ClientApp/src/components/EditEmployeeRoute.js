import React from 'react';
import { isLoggedInRequest } from '../helper/Consts';
import { Route, Redirect } from 'react-router-dom';
import { EditEmployee } from './EditEmployee';

export function EditEmployeeRoute() {
    const isLoggedIn = sessionStorage.getItem(isLoggedInRequest);
    return (
        <Route render={() => {
            if (!isLoggedIn) {
                return <Redirect to='/' />
            }
            return <EditEmployee/>
        }} />
    );
}