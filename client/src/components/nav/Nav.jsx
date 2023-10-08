import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faComments,
  faUser,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";

function Nav() {
  return (
    <div className="navbar">
      <a href="/" className="active">
        <FontAwesomeIcon icon={faHome} />
        <br />Home
      </a>
      <a href="/matches">
        <FontAwesomeIcon icon={faUsers} />
        <br />Matches
      </a>
      <a href="/convos">
        <FontAwesomeIcon icon={faComments} />
        <br />Convos
      </a>
      <a href="/profile">
        <FontAwesomeIcon icon={faUser} />
        <br />Profile
      </a>
      <a href="/friends">
        <FontAwesomeIcon icon={faUserFriends} />
        <br />Friends
      </a>
    </div>
  );
}

export default Nav;
