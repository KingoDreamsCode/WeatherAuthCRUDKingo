import './App.css';
import WeatherConfig from './WeatherConfig';
import WeatherApp from './Component/WeatherApp/WeatherApp';
import Login from './Component/pages/Login';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './config/firebase-config';
import Signup from './Component/pages/Signup';
import Blog from './Component/blog/Blog';
function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (

    <div className='App'>
      <BrowserRouter>
        <Routes>
            <Route path="/weather" element={user? <WeatherApp />: <Navigate to = "/login"/>} />
            <Route path="/" element={<Blog />} />
            <Route path='/login' element = {<Login/>}></Route>
            <Route path='/signup' element = {<Signup />}></Route>
            <Route path='/kingoweather' element = {user? <WeatherConfig/>: <Navigate to="/login" />}></Route>
        </Routes>
  </BrowserRouter>
</div>

  );
}

export default App;

