import React, { useState, useEffect } from 'react';
import './login.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { auth, provider, provider1, provider2 } from '../../config/firebase-config';
import { signInWithPopup, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import Validation from './LoginValidation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(auth?.currentUser?.email)
  console.log(auth?.currentUser?.password)

  const signin = async () => {
    try {
      signInWithEmailAndPassword(auth, email, password);
      navigate("/kingoweather");
    } catch (error) {
         console.log("Account Does not Exist")
         console.log(error);
    }
  };
   

  const signupWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider)
      navigate("/kingoweather")
    } catch (error) {
      console.log(error)
    }
  };

  const signupWithGithub = async () => {
    try {
      await signInWithPopup(auth, provider2)
      navigate("/kingoweather")
    } catch (error) {
      console.log(error)
    }
  };

  const signupWithFacebook = async () => {
    try {
      await signInWithPopup(auth, provider1)
      navigate("/kingoweather")
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    registerBtn.addEventListener('click', () => {
      container.classList.add('active');
    });

    loginBtn.addEventListener('click', () => {
      container.classList.remove('active');
    });

    return () => {
      // Cleanup event listeners
      registerBtn.removeEventListener('click', () => {
        container.classList.add('active');
      });
      loginBtn.removeEventListener('click', () => {
        container.classList.remove('active');
      });
    };
  }, []);

  return (
    <div className="container" id="container">
      <div className="form-container sign-in">
        <form action="" onSubmit={signin}>
          <h1>Sign In</h1>
          <span>Use Email And Password</span>
          <input type="email" placeholder="Email" name="email" required onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" name="password" required onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Sign In</button>
        </form>
        <div>
        <button className="icon"><i class="fa fa-key" aria-hidden="true"></i></button>
        </div>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Login To Access Our Infinite Weather Details</p>
            <button className="hidden" id="login" onClick={signin}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
          <p>Login With Social Networks</p>
          <div className="social-icons">
            <button className="icon" onClick={signupWithGoogle}><i className="fab fa-google-plus-g"></i></button>
            <button className="icon" onClick={signupWithFacebook}><i className="fab fa-facebook-f"></i></button>
            <button className="icon" onClick={signupWithGithub}><i className="fab fa-github"></i></button>
          </div>
            <h1>Hello, Friends</h1>
            <p>Register here and get all weather Updates</p>
            <button onClick={() => window.location.pathname = '/signup'} className="hidden" id="register">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
