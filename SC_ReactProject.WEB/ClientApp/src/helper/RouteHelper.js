import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedInRequest } from './Consts';

export function RouteHelper( {path, component} ) {
    const isLoggedIn = sessionStorage.getItem(isLoggedInRequest);
    if (!isLoggedIn) {
        return(
            <Redirect path='/'/>
        )
    }
    return(
        <Route path={path} component={component} />
    )
}