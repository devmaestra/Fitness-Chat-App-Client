import './App.css';
import React from 'react';
import Header from './components/header/Header';
import Nav from './components/nav/Nav';
import Auth from './components/auth/Auth';
import Matches from './components/matches/Matches';
import Profile from './components/profile/EditProfile';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
// import ConversationIndex from './components/conversations/ConversationIndex';
import ConversationTable from "./components/conversations/ConversationTable";

function App() {
  const [sessionToken, setSessionToken] = useState('');

  const updateToken = newToken => {
    console.log("Updating token with:", newToken);
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
  };
  
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Auth updateToken={updateToken} />} />
        <Route path="/matches" element={<Matches token={sessionToken} />} />
        <Route path="/profile" element={<Profile token={sessionToken} />} />
        <Route path='/myconversations' element={<ConversationTable token={sessionToken} />} />
      </Routes>
      {sessionToken !== '' ?  <Nav /> : null}
      <Nav setSessionToken={setSessionToken} /> {/* Pass setSessionToken to Nav */}
    </div>
  );
}

export default App;
