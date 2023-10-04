import React from 'react'

function Header() {

    const name = 'Geo';

  return (
    <div className='header'>
        <h1 id="fancyTitle">Swoul Mates</h1>
        <p>Welcome to your fitness app, {name}.</p>
        
    </div>
  )
}

export default Header
