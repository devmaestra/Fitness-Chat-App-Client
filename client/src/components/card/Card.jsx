import React from 'react';

function Card({ username, userImage, zipCode, cityName }) {  //* add activities
  return (
    <div className="card">
      {userImage ? (
        <img src={userImage} alt={username} />
      ) : (
        <img
          src="../assets/User-Profile-PNG-Image.png"
          alt="Default User"
          className="default-image"
        />
      )}
      <h2>{username}</h2>
      <p>{zipCode}</p>
      <p>{cityName}</p>
    </div>
  );
}

export default Card;


// import React from 'react';

// function Card({ user }) {
//   return (
//     <div className="card">
//       <img src={user.userImage} alt={user.username} />
//       <h2>{user.username}</h2>
//       <p>Zip Code: {user.locationZip}</p>
//       <p>City: {user.cityName}</p>
//       <p>Activities: {user.activities.join(', ')}</p>
//     </div>
//   );
// }

// export default Card;
