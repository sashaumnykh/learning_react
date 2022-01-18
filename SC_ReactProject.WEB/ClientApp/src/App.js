import React, { Component, useState } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';

//import './custom.css'
import './styles.css'
import { EmployeesList } from './components/EmployeesList';
import LogInForm from './components/LogInForm';

export default function App() {

  const adminUser = {
    email: "admin",
    password: "admin"
  }

  const [currentUser, setCurrentUser] = useState({email: "", password: ""});

  const login = details => {
      if (details.email == adminUser.email && details.password == adminUser.password){
      setCurrentUser({
        email: details.email,
        password: details.password
      });
    }
  }

  return (
    <div className='App'>
      {
        (currentUser.email != "") ? (
          <div>
            <EmployeesList />
          </div>
        ) : <LogInForm login={login} />
      }
    </div>
  );
}
