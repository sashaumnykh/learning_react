import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';


//import './custom.css'
import './styles.css'
import EmployeesList from './components/EmployeesList';
import LogInForm from './components/LogInForm';
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
      <div>
          <Route path="/employee/:id" component={EditEmployee} />
          <Route path="/add" component={AddEmployeeForm} />
          <Route exact path="/" >
            {isLoggedIn 
            ? ( <div><EmployeesList /></div>) 
            : <LogInForm login={login} />}
          </Route>
      </div>
  );
}
