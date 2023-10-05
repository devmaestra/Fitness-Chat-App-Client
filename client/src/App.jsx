import './App.css';
import Header from './components/header/Header';
import Nav from './components/nav/Nav';
import React from 'react';
import ProfilePic from "./components/profile/ProfilePic";
import Auth from './/components/auth/Auth';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';


//Font Awesome Imports
import '@fortawesome/fontawesome-svg-core/styles.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faUser } from '@fortawesome/free-solid-svg-icons';
library.add(faCoffee, faUser);

// import Footer from './components/footer/Footer';


function App() {

  const [sessionToken, setSessionToken] = useState('');

  const updateToken = newToken => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
  }

  useEffect(() => {
    if(localStorage.getItem('token')) {
    setSessionToken(localStorage.getItem('token'))
  }
  },[])

  return (
    <div className="App">
      <Header />

      <Routes>
      <Route
    path='/'
    element={<Auth updateToken={updateToken} />}
  />
      </Routes>
      <Nav />

      {/* <Footer /> */}
    </div>
  );
}

export default App;
