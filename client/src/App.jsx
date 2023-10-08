import './App.css';
import Header from './components/header/Header';
import Nav from './components/nav/Nav';
import React from 'react';
import Auth from './/components/auth/Auth';
import Matches from './components/matches/Matches';
import Profile from './components/profile/EditProfile'
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Logout from './components/auth/logout/Logout';

// import Footer from './components/footer/Footer';

function App() {

  const [sessionToken, setSessionToken] = useState('');

  const updateToken = newToken => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'))
    }
  }, [])

  return (
    <div className="App">
      <Header />
      {
      sessionToken !== '' ?
      <Logout setSessionToken={setSessionToken}/> : null
    }
      <Routes>

        <Route
          path='/'
          element={<Auth updateToken={updateToken} />}
        />
        <Route
          path='/matches'
          element={<Matches token={sessionToken} />}
        />
        <Route
          path='/profile'
          element={<Profile token={sessionToken} />}
        />
      </Routes>
      <Nav />

      {/* <Footer /> */}
    </div>
  );
}

export default App;
