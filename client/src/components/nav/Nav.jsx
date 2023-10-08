import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faComments, faUser, faUserFriends } from '@fortawesome/free-solid-svg-icons';

function Nav() {
  return (
    <div className="navbar">
      <a href="/home" className="active">
        <FontAwesomeIcon icon={faHome} /> Home
      </a>
      <a href="/matches">
        <FontAwesomeIcon icon={faUsers} /> Matches
      </a>
      <a href="/convos">
        <FontAwesomeIcon icon={faComments} /> Convos
      </a>
      <a href="/profile">
        <FontAwesomeIcon icon={faUser} /> Profile
      </a>
      <a href="/friends">
        <FontAwesomeIcon icon={faUserFriends} /> Friends
      </a>
    </div>
  );
}

export default Nav;