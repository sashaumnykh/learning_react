import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';


//import './custom.css'
import './styles.css'
import EmployeesList from './components/EmployeesList';
import LogInForm from './components/LogInForm';
import { isLoggedInRequest, employeesRequest } from './helper/Consts';
import { AddEmployeeRoute } from './components/AddEmployeeRoute';
import { EditEmployeeRoute } from './components/EditEmployeeRoute';

export default function App() {

  const adminUser = {
    email: "admin",
    password: "admin"
  }

  const [currentUser, setCurrentUser] = useState({email: "", password: ""});

  const login = (login, password) => {
      if (login == adminUser.email && password == adminUser.password){
        setCurrentUser({
            email: login,
            password: password
        });
        sessionStorage.setItem(isLoggedInRequest, true);
    }
  }

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
            : <LogInForm login={login} />}
          </Route>
          <Redirect to="/" />
      </div>
  );
}
