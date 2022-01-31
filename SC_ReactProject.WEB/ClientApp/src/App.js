import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import EmployeesList from './components/EmployeesList';
import LogInForm from './components/LogInForm';
import { isLoggedInRequest } from './helper/Consts';
import { AddEmployeeRoute } from './components/AddEmployeeRoute';
import { EditEmployeeRoute } from './components/EditEmployeeRoute';

import './styles.css'

export default function App() {

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
