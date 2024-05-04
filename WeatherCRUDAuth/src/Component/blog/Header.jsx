import React from 'react'
import './blog.css';
import { signOut } from 'firebase/auth';
import { auth, provider, provider1, provider2 } from '../../config/firebase-config';
import { useNavigate } from 'react-router-dom';


const Header = () => {

  const navigate = useNavigate()

  const logout = async()=>{
   try {
     await signOut(auth)
     navigate('/login')
   } catch (error) {
     console.log(error)
   }
  }
  return (
    <header>
      <nav className = "navbar">
      <div className = "container3">
        <a href='/' class = "navbar-brand">Kingo's Blog</a>
        <div class = "navbar-nav">
          <a href = "/weather">Weather</a>
          <a href = "/kingoweather">Pro Weather</a>
          <a href = "/signup">Sign Up</a>
          <a href = "/login">Login</a>
          <a onClick={logout}>Log Out</a>
        </div>
      </div>
    </nav>
    </header>

  )
}

export default Header