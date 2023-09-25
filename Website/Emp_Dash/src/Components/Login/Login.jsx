import './Login.css'
import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import axios from 'axios';
import { Navigate } from "react-router-dom";


const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newUser,setNewUser] = useState('');
  const [newPassword,setNewPassword] = useState('');
  

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async(event) => {
    event.preventDefault()
    if (username === '' || password === '') {
      alert('Fill all the details')
      return
    }
    try {
      const response = await axios.post('http://localhost:8000/login',{
        username:username,
        password:password
      });
      setUsername('')
      setPassword('')
      if(response.data['login']===true){
        props.setLoggedIn(true)
        props.setUser(response.data['User'])
      }
      else{
        alert(response.data['Message'])
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  const handleCreateAccount = async(event) => {
    event.preventDefault()
    if (newUser === '' || newPassword === '') {
      alert('Fill all the details')
      return
    }
    try {
      const response = await axios.post('http://localhost:8000/register',{
        username:newUser,
        password:newPassword
      });
      setNewUser('')
      setNewPassword('')
      if(response.data['Message']==='Account Created'){
        alert('Account Created')
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  return (
    <div className='loginPage'>
    <h1>Employee Login Page</h1>
    <div className="login-form">
      <h2>Login</h2>
      <form className='loginForm'>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="form-buttons">
        <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="Button violet">Create Account</button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="DialogOverlay" />
              <Dialog.Content className="DialogContent">
                <Dialog.Title className="DialogTitle">Create Account</Dialog.Title>
                <Dialog.Description className="DialogDescription">
                  Enter details for your new account.
                </Dialog.Description>
                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="name">
                    Userame
                  </label>
                  <input className="Input" id="username" onChange={(e)=>setNewUser(e.target.value)}/>
                </fieldset>
                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="username">
                    Password
                  </label>
                  <input className="Input" id="password" onChange={(e) => setNewPassword(e.target.value)}/>
                </fieldset>
                <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                  <Dialog.Close asChild>
                    <button className="Button green" onClick={handleCreateAccount}>Save changes</button>
                  </Dialog.Close>
                </div>
                <Dialog.Close asChild>
                  <button className="IconButton" aria-label="Close">
                    <Cross2Icon />
                  </button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
          <button className='loginButton' onClick={handleLogin}>
            Login
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Login;



