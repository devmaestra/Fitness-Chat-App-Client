import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function Logout({ setSessionToken }) {
  const navigate = useNavigate();

  const signout = () => {
    if (typeof setSessionToken === "function") {
      localStorage.removeItem("token");
      setSessionToken("");
      navigate("/");
    }
  };

  const style = {
    float: "right",
    margin: ".5rem",
  };

  return (
    <div onClick={signout} className="nav-btn">
      <FontAwesomeIcon icon={faSignOutAlt} />
      <br />
      Signout
    </div>
  );
}

export default Logout;
