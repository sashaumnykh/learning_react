import React, { Component, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { isLoggedInRequest } from '../helper/Consts';
import axios from 'axios';

function AddEmployeeForm() {
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        birthday: '',
        salary: null,
        lastModified: '' 
    });
    const history = useHistory();
    const isLoggedIn = sessionStorage.getItem(isLoggedInRequest);

    const addButtonHandler = () => {
        newUser.lastModified = new Date().toUTCString();
        axios.post('/employee/', newUser)
          .then(function (response) {
            console.log('add employee: ' + response);
          })
          .catch(function (error) {
            console.log(error);
          });
        history.push('/');
    };
    
    // if (!isLoggedIn) {
    //     history.push('/');
    //     return(
    //         null
    //     );
    // }
    
    return(
        <form className='f-out'>
            <div className='f-in'>
                <h1>Add an employee:</h1>
                <div>
                    <label hrmlFor="employeeName">Name:</label>
                    <input onChange={e => setNewUser({...newUser, name: e.target.value})} 
                            value={newUser.name} />
                </div>
                <div>
                    <label hrmlFor="employeeName">Email:</label>
                    <input onChange={e => setNewUser({...newUser, email: e.target.value})} 
                            value={newUser.email} />
                </div>
                <div>
                    <label hrmlFor="employeeName">Birthday:</label>
                    <input type="date" 
                            onChange={e => setNewUser({...newUser, birthday: e.target.value})} 
                            value={newUser.birthday} />
                </div>
                <div>
                    <label hrmlFor="employeeName">Salary:</label>
                    <input onChange={e => setNewUser({...newUser, salary: e.target.value})} 
                            value={newUser.salary} />
                </div>
                <button onClick={addButtonHandler}>Add</button>
            </div>
        </form>
        
    );
}

export default AddEmployeeForm;