import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

class Login { 
  state = {
    username: '',
    password: '',
  }

 handleInput = e => {
   this.setState({ 
     [e.target.name]: e.target.value
   })
 }

 submit = e => {
  e.preventDefault();
  
  axios.post('http://localhost:3300/api/login')
  .then( res => {
    localStorage.setItem('T', res.data.token);
    this.props.history.push('/users')
  })
  .catch( err => {
    console.error(err);
  })
 }

 render() {
   return (
     <div>
       <h2>Login</h2>
       <form onSubmit={this.submit}>
        <input
          id='username'
          onChange={this.handleInput}
          value={this.state.username}
          type='text'
          placeholder='Username'
        />
        <input
          id='password'
          onChange={this.handleInput}
          value={this.state.password}
          type='password'
          placeholder='Password'
        />
        <button type='submit'>Login</button>
       </form>
     </div>
   )
 }


}

export default Login