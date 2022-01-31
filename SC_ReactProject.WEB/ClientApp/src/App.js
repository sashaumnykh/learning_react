import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom';


//import './custom.css'
import './styles.css'
import EmployeesList from './components/EmployeesList';
import LogInForm from './components/LogInForm';
import { isLoggedInRequest, employeesRequest, tokenRequest } from './helper/Consts';
import { AddEmployeeRoute } from './components/AddEmployeeRoute';
import { EditEmployeeRoute } from './components/EditEmployeeRoute';


export default function App() {
  const history = useHistory();

  const userLocale =
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language;

  sessionStorage.setItem('locale', userLocale);

  const isLoggedIn = sessionStorage.getItem(isLoggedInRequest);

  return (
      <div>
          <Route path="/employee/:id" component={EditEmployeeRoute} />
          <Route path="/add" component={AddEmployeeRoute} />
          <Route exact path="/" >
            {isLoggedIn 
            ? ( <div><EmployeesList /></div>) 
            : <LogInForm/>}
          </Route>
          <Redirect to="/" />
      </div>
  );
}
