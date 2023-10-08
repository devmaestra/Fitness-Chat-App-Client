import React from 'react';

function Card({ username, userImage, locationZip, cityName }) {  //TODO * add activities to matching
  return (
    <div className="card1">

      {userImage ? (
        <img src={userImage} alt={username} />
      ) : (
        <img
          src="/assets/User-Profile-PNG-Image.png"
          alt="Default User"
          className="default-image"
        />
      )}

      <h2>{username}</h2>
      <p>{locationZip}</p>
      <p>{cityName}</p>
    </div>
  );
}

export default Card;
