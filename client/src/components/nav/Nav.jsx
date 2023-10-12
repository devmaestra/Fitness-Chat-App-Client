import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faComments, faUser, faUserFriends } from '@fortawesome/free-solid-svg-icons';
// import ConversationIndex from '../conversations/ConversationIndex';
import ConversationTable from '../conversations/ConversationTable';
import { useNavigate, Link, Route, Routes } from 'react-router-dom';
import { Button } from 'reactstrap';

function Nav() {
  const navigate = useNavigate();

  const handleMyConvosClick = () => {
    // Use navigate to redirect to /myconversations
    navigate('/myconversations');
  };

  return (
    <div className="navbar">

      <Link to="/" className="active">
        <FontAwesomeIcon icon={faHome} /> Home
      </Link>

      <Link to="/matches">
        <FontAwesomeIcon icon={faUsers} /> Matches
      </Link>

      <Link to="/myconversations">
        <Button onClick={handleMyConvosClick}>
        
        <FontAwesomeIcon icon={faComments} /> Convos
        </Button>
      </Link>

      <Link to="/profile">
        <FontAwesomeIcon icon={faUser} /> Profile
      </Link>

      <Link to="/friends">
        <FontAwesomeIcon icon={faUserFriends} /> Friends
      </Link>
    </div>
  );
}

export default Nav;
