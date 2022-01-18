import React, { Component, useState } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';

//import './custom.css'
import './styles.css'
import { EmployeesList } from './components/EmployeesList';
import LogInForm from './components/LogInForm';

export default class App extends Component {
    constructor(props){
        super(props);
        const user = JSON.parse(sessionStorage.getItem("user"));
        this.state = {
            adminUser: {
            email: "admin",
            password: "admin"
        },
        currentUser: (user && user.isLoggedIn)
        ? user
        : {
            email: "",
            password: "",
            isLoggedIn: false
        }
        };
        this.login = this.login.bind(this);
    }

    login = details => {
        if (details.email == this.state.adminUser.email && details.password == this.state.adminUser.password){
        const user = {
            email: details.email,
            password: details.password,
            isLoggedIn: true
        }
        this.setState({
            currentUser: user
        });
        sessionStorage.setItem("user", JSON.stringify(user));
        }
    }

    render() {
        return (
        <div className='App'>
            {
            (this.state.currentUser.isLoggedIn == true) ? (
            <div>
                <EmployeesList />
            </div>
            ) : <LogInForm login={this.login} />
            }
        </div>
        );
    } 
}
