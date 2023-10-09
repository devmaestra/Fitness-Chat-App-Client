import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

function Logout({ setSessionToken }) {
  const navigate = useNavigate();

  const signout = () => {
    localStorage.removeItem("token"); // clears out localStorage
    setSessionToken(""); // resets out state to an empty string
    navigate("/"); // rouths us back to Auth
  };

  const style = {
    float: "right",
    margin: ".5rem",
    marginLeft: "-60px",
    marginTop: "-40px",
    marginBottom: "5px",
    backgroundColor: "#D9D9D9",
    color: "#3C6E71",
    borderColor: "#3C6E71",
  };

  return (
    <>
      <Button color="info" outline style={style} onClick={signout}>
        <strong>Signout</strong>
      </Button>
    </>
  );
}

export default Logout;
