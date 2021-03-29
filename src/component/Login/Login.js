import React from 'react';
import { useContext, useState } from 'react';
import { UseContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { initializeLogInFrameWork, handleFacebook, handleGoogleSignIn, handleGoogleSignOut, createUserWithEmailAndPassword, userSignInWithEmailAndPassword } from './LogInManager';



function Login() {
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  })
  initializeLogInFrameWork();
  const [loggedInUser, setLoggedInUser] = useContext(UseContext)
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res  => {
      handleResponse(res, true)
    })
  }
  
  const googleSignOut = () => {
    handleGoogleSignOut()
    .then(res => {
      handleResponse(res, false)
    })
  }

  const facebookSignIn = () => {
    handleFacebook()
    .then(res => {
      handleResponse(res, true)
    })
  }
  
  const handleChange = (e) => {
    let isFieldValid = true;
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    };
    if(e.target.name === 'password'){
      const isPasswordValid = (e.target.value.length) > 6;
      const passWordHasNumber = /\d{1}/.test(e.target.value)
      isFieldValid = isPasswordValid && passWordHasNumber;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
      }
  }

    const handleSubmit = (e) => {
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true)
      })
    }
    if(!newUser && user.email && user.password){
      userSignInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true)
      })
    }
    e.preventDefault();
  }
  
  const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        redirect && history.replace(from);
  }
  
  return (
    <div style={{textAlign:'center'}}>
      <button onClick={facebookSignIn} style={{padding:'20px 25px', background:'skyblue'}}>Log In Facebook</button>
      {
        user.isSignedIn ? <button onClick={googleSignOut} style={{ padding: '20px 50px' }}>Sign Out</button>
         : <button onClick={googleSignIn} style={{ padding: '20px 50px', margin: '50px 0 0 0' }}>Sign In</button>
      }
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}</p>
          <img src={user.photo} alt="" />
        </div>
      }
      <h1>Our Own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" onBlur={handleChange} name="name" placeholder='Name' id="sign-in"/>}
        <br/>
        <input type="email" onBlur={handleChange} name="email" placeholder="Email" required id="sign-in"/>
        <br/>
        <input type="password" onBlur={handleChange} name="password" placeholder="Password" required id="sign-in"/>
        <br/>
        <input className='button-input' type='submit' value={newUser?'Sign Up':'Sign In'}/>
      </form>
      <p style={{color:'red', fontSize:'20px'}}>{user.error}</p>
      {
        user.success && <p style={{color:'green',fontSize:'20px'}}>Account {newUser?'Created':'Logged In'} Successfully</p>
      }
    </div>
  );
}

export default Login;
