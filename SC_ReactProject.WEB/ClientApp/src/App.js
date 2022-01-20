import React, { Component, useState, useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Layout } from './components/Layout';

//import './custom.css'
import './styles.css'
import EmployeesList from './components/EmployeesList';
import LogInForm from './components/LogInForm';
import { LogInContext } from './helper/Context';
import { EditEmployee } from './components/EditEmployee';
import AddEmployeeForm from './components/AddEmployeeForm';

export default function App() {

  const adminUser = {
    email: "admin",
    password: "admin"
  }

  const [currentUser, setCurrentUser] = useState({email: "", password: ""});

  const [loggedIn, setLoggedIn] = useState(false);

  const login = details => {
      if (details.email == adminUser.email && details.password == adminUser.password){
        setCurrentUser({
            email: details.email,
            password: details.password
        });
        sessionStorage.setItem('currentUserIsLoggedIn', true);
    }
  }

  const isLoggedIn = sessionStorage.getItem('currentUserIsLoggedIn');

  return (
    <BrowserRouter>
        <Switch>
          <Route path="/employee/:id">
            <EditEmployee />
          </Route>
          <Route path="/add">
            <AddEmployeeForm />
          </Route>
          <Route path="/">
            {isLoggedIn 
            ? ( <div><EmployeesList /></div>) 
            : <LogInForm login={login} />}
          </Route>
        </Switch>
    </BrowserRouter>
  );
}
