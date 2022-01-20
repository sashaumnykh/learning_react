import React, { Component, useState, useContext } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';

//import './custom.css'
import './styles.css'
import { EmployeesList } from './components/EmployeesList';
import LogInForm from './components/LogInForm';
import { LogInContext } from './helper/Context';

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
    <LogInContext.Provider value={{ loggedIn: false, setLoggedIn }} className='App'>
      {
        isLoggedIn ? (
          <div>
            <EmployeesList />
          </div>
        ) : <LogInForm login={login} />
      }
    </LogInContext.Provider>
  );
}
