import React, { useState } from "react";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import { Button, Col, Container, Row } from "reactstrap";

function Auth(props) {

  const [button, setButton] = useState("Signup");

  const swapForm = () => {
    button === "Login" ? setButton("Signup") : setButton("Login");
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
          <Login
            updateToken={props.updateToken}
          />
        </Col>
      </Row>
    );
  };

  return (
    <>
      <Button onClick={swapForm} color="dark">
        {button}
      </Button>
      <Container>{displayForm()}</Container>
    </>
  );
}

export default Auth;