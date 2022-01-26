import React, { useState } from 'react';
// import { 
//     BrowserRouter, 
//     Route,
//     Switch, 
//     // Redirect 
// } from 'react-router-dom';


//import './custom.css'
import './styles.css'
import EmployeesList from './components/EmployeesList';
import LogInForm from './components/LogInForm';
import { EditEmployee } from './components/EditEmployee';
import AddEmployeeForm from './components/AddEmployeeForm';
import { isLoggedInRequest 
    //, employeesRequest 
} from './helper/Consts';
import Form from './components/Form';

export default function App() {

  const adminUser = {
    email: "admin",
    password: "admin"
  }

  const [
      // currentUser, 
    setCurrentUser
  ] = useState({email: "", password: ""});

  // const [loggedIn, setLoggedIn] = useState(false);

  const login = details => {
      if (details.email === adminUser.email && details.password === adminUser.password){
        setCurrentUser({
            email: details.email,
            password: details.password
        });
        sessionStorage.setItem(isLoggedInRequest, true);
    }
  }

  const isLoggedIn = sessionStorage.getItem(isLoggedInRequest);

  return (
      <div>
          {/* <Route path="/employee/:id" component={EditEmployee} />
          <Route path="/add" component={AddEmployeeForm} />
          <Route exact path="/" >
            {isLoggedIn 
            ? ( <div><EmployeesList /></div>) 
            : <LogInForm login={login} />}
          </Route>
          <BrowserRouter>
            <Switch>
                <Route path="/form">
                    
                </Route>
            </Switch>
          </BrowserRouter> */}
          <Form />
      </div>
  );
}
