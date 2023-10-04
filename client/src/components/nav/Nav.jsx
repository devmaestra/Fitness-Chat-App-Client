import React from 'react'

function Nav() {
  return (
        <div className="navbar">
            <a href="#home" className="active">Home</a>
            <a href="#matches">Matches</a>
            <a href="#convos">Convos</a>
            <a href="#profile">Profile</a>
            <a href="#friends">Friends</a>
        </div>
  )
}

export default Nav