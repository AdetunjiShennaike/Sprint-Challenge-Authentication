import React from 'react';
import './App.css';

import { Route, NavLink } from 'react-router-dom'

import Login from './auth/Login';
import Users from './users/Users';

function App(props) {
  logout = () => {
    localStorage.removeItem('T')
    props.history.push('/login')
  }

  return (
    <div className="App">
      <header className="App-header">
        <NavLink to="/login">Login</NavLink>  
        <NavLink to="/users">Users</NavLink>       
        <button type="button" onClick={logout}>
          Logout
        </button>
      </header>
      <div> 
        <Route path="/login" component={Login} />
        <Route path="/users" component={Users} />
      </div>
    </div>
  );
}

export default App;
