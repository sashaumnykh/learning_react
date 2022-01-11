import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';

import './custom.css'
import { EmployeesList } from './components/EmployeesList';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={EmployeesList} />
        {/* <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} /> */}
      </Layout>
    );
  }
}
