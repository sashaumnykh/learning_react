import React, { useState, useContext } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { isLoggedInRequest } from '../helper/Consts';

export function EditEmployee(props) {
    const history = useHistory();
    const isLoggedIn = sessionStorage.getItem(isLoggedInRequest);
    let { id } = useParams();

    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        birthday: '',
        salary: null,
        lastModified: '' 
    });
    const employees = JSON.parse(localStorage.getItem('employees'));

    const saveButtonHandler = () => {
        // api call
        history.push('/');
    };

    if (!isLoggedIn) {
        history.push('/');
        return(
            null
        );
    }

    return(
        <form className='form-outer'>
            <div>
                <Link to="/"> Back</Link>
                <br/><br/>
                Employee {id}
            </div>
            <div className='form-inner'>
                <h1>Edit:</h1>
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
                <button onClick={saveButtonHandler}>Save</button>
            </div>
            {employees}
        </form>
        
    );
}