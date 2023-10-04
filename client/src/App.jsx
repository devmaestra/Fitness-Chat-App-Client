import './App.css';
import React from 'react';
import ProfilePic from "./components/profile/ProfilePic";

// import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Nav from './components/nav/Nav';

function App() {
  return (
    <div className="App">
      <Header />
      <ProfilePic />
      <Nav />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
