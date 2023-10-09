import React, { useState } from "react";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import { Button, Col, Container, Row } from "reactstrap";

function Auth(props) {
  const [button, setButton] = useState("Signup");

  const swapForm = () => {
    button === "Login" ? setButton("Signup") : setButton("Login");
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

  const displayForm = () => {
    return button === "Login" ? (
      <Row>
        <Col md="12">
          <Signup updateToken={props.updateToken} />
        </Col>
      </Row>
    ) : (
      <Row>
        <Col md="12">
          <Login updateToken={props.updateToken} />
        </Col>
      </Row>
    );
  };

  return (
    <>
      <Button onClick={swapForm} style={style}>
        {button}
      </Button>
      <Container>{displayForm()}</Container>
    </>
  );
}

export default Auth;
