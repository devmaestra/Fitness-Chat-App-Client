import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useNavigate } from "react-router-dom";

import {
  faHome,
  faUsers,
  faComments,
  faUser,
  // faUserFriends,
  // faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

import Logout from '../auth/logout/Logout'; // Import the Logout component
import { NavLink } from 'react-router-dom';


function Nav({ setSessionToken }) {

  // const navigate = useNavigate();

  // const handleMyConvosClick = () => {
  //   // Use navigate to redirect to /myconversations
  //   navigate('/myconversations');
  // };

  return (
    <div className="navbar">
      <NavLink to="/" exact="true" activeclassname="active">
        <FontAwesomeIcon icon={faHome} />
        <br />Home
      </NavLink>
      <NavLink to="/matches" activeclassname="active">
        <FontAwesomeIcon icon={faUsers} />
        <br />Matches
      </NavLink>
      <NavLink to="/myconversations" activeclassname="active">
        <FontAwesomeIcon icon={faComments} />
        <br />Convos
      </NavLink>
      <NavLink to="/profile" activeclassname="active">
        <FontAwesomeIcon icon={faUser} />
        <br />Profile
      </NavLink>
      {setSessionToken ? (
        <NavLink to="/" activeclassname="active">
          <Logout setSessionToken={setSessionToken} />
        </NavLink>
      ) : null}
    </div>
  );
}


export default Nav;
