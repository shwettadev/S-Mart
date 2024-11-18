// Login.js
import React from 'react';
import './Login.scss';  // Import the SCSS file located in the same folder
import { useDispatch } from 'react-redux';
import { authActions } from '../../redux/reducer/auth.reducer';
import { useNavigate } from 'react-router';

const Login = () => {
const dispatch = useDispatch()
let navigate = useNavigate()
  const handleLogin = () => {
    dispatch(authActions.login())
    navigate("/")
  }
    return (
      <div class="login_container">
      <div class="login-screen">
        <h1>Login</h1>
        <h3>Enter your login credentials</h3>
        <form action="">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" placeholder="Enter your Username" required/>
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" placeholder="Enter your Password" required/>
          <button type="submit" class="submit-button" onClick={() => {handleLogin()}}>Login</button>
        </form>
      </div>
    </div>  
    );
};

export default Login;
