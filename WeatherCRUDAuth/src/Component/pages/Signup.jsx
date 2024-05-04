import React, { useState, useEffect } from 'react';
import './login.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { auth, provider, provider1, provider2 } from '../../config/firebase-config';
import { signInWithPopup, createUserWithEmailAndPassword} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Signup = () => { 
  console.log(auth?.currentUser?.email)
  const signup = async()=>{
    try {
      createUserWithEmailAndPassword(auth, email, password);
      console.log("Account Created Successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };


  const navigate = useNavigate();


  const signupWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  };

  const signupWithGithub = async () => {
    try {
      await signInWithPopup(auth, provider2)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  };

  const signupWithFacebook = async () => {
    try {
      await signInWithPopup(auth, provider1)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  };

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

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
        <form action="" onSubmit={signup} >
          <h1>Sign Up</h1>
          <span>Use Email And Password</span>
          <input type="email" placeholder="Email" name="email" required onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" name="password" required onChange={(e)=> setPassword(e.target.value)} />
          <button type='submit'>Sign Up</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Register here and get all weather Updates</p>
            <button className="hidden" id="login">
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
          <p>Sign Up With Social Networks</p>
          <div className="social-icons">
            <button className="icon" onClick={signupWithGoogle}><i className="fab fa-google-plus-g"></i></button>
            <button className="icon" onClick={signupWithFacebook}><i className="fab fa-facebook-f"></i></button>
            <button className="icon" onClick={signupWithGithub}><i className="fab fa-github"></i></button>
          </div>
            <h1>Hello, Friends</h1>
            <p>Login To Access Our Infinite Weather Details</p>
            <button onClick={() => window.location.pathname = '/login'} className="hidden" id="register">Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

/*import React, { useEffect, useState } from 'react';
import './login.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { auth, provider } from '../../config/firebase-config';
import { signInWithPopup } from 'firebase/auth';
import Validation from './LoginValidation';
import axios from 'axios';

const Login = () => {
const [value, setValue] = useState('');
const loginWithGoogle = () => {
signInWithPopup(auth, provider).then((data) =>{
setValue(data.user.email)
localStorage.setItem("email",data.user.email)
})
};
useEffect(() =>{
setValue(localStorage.getItem('email'))
})

const [values, setValues] = useState({
name: '',
email: '',
password: ''
})

const [errors, setErrors] = useState({})

const handleInput = (event) => {
setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
}
const handleSubmit = (event) => {
event.preventDefault();
setErrors(Validation(values));
if(errors.name ==="" && errors.email === "" && errors.password === "")
    axios.post('http://localhost:8081/login', values)
    .then(res => console.log(res))
    .catch(err => console.log(err));
}

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
<div className="form-container sign-up">
<form onSubmit={handleSubmit}>
<h1>Create Account</h1>
<div className="social-icons">
<a href="#" className="icon"><i className="fab fa-google-plus-g"></i></a>
<a href="#" className="icon"><i className="fab fa-facebook-f"></i></a>
<a href="#" className="icon"><i className="fab fa-github"></i></a>
<a href="#" className="icon"><i className="fab fa-linkedin-in"></i></a>
</div>
<span>Register Today and See Tomorrow</span>
{errors.username && <span className='text-error'>{errors.username}</span>}
<input type="text" name='name' placeholder="Name" onChange={handleInput}/>
{errors.name && <span className='text-error'>{errors.name}</span>}
<input type="email" name='email' placeholder="Email" onChange={handleInput}/>
{errors.email && <span className='text-error'>{errors.email}</span>}
<input type="password" name='password' placeholder="Password" onChange={handleInput}/>
{errors.password && <span className='text-error'>{errors.password}</span>}
<button type="submit">Sign Up</button>
</form>
</div>
<div className="form-container sign-in">
      <div className="social-icons">
          <button className="icon" onClick={loginWithGoogle}><i className="fab fa-google-plus-g"/></button>
      </div>
    <form action='' onSubmit={handleSubmit}>
      <h1>Sign In</h1>

      <span>Use Email And Password</span>
      <input type="email" placeholder="Email" name='email'  onChange={handleInput}/>
      {errors.email  && <span className='text-error'>{errors.email}</span>}
      <input type="password" placeholder="Password" name='password' onChange={handleInput} />
      {errors.password  && <span className='text-error'>{errors.password}</span>}
      <a href="#">Forget Your Password?</a>
      <button type="submit">Sign In</button>
    </form>
  </div>
  <div className="toggle-container">
    <div className="toggle">
      <div className="toggle-panel toggle-left">
        <h1>Welcome Back!</h1>
        <p>Login To Access Our Infinite Weather Details</p>
        <button className="hidden" id="login">Sign In</button>
      </div>
      <div className="toggle-panel toggle-right">
        <h1>Hello, Friends</h1>
        <p>Register here and get all weather Updates</p>
        <button className="hidden" id="register">Sign Up</button>
      </div>
    </div>
  </div>
</div>
);

}

export default Login;*/