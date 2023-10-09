import React, { useRef } from "react";
import FullButton from "../../buttons/FullButton";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const locationZipRef = useRef();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const locationZip = locationZipRef.current.value;

    let bodyObj = JSON.stringify({
      username: username,
      email: email,
      password: password,
      locationZip: locationZip,
    });

    const url = `http://localhost:4001/user/signup`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      headers,
      body: bodyObj,
      method: "POST",
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);

      props.updateToken(data.token);

      if (data.message === "Success!") {
        props.updateToken(data.token);
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  const style = {
    margin: ".5rem",
    marginTop: "10px",
    marginBottom: "5px",
    backgroundColor: "#D9D9D9",
    color: "#3C6E71",
    borderColor: "#3C6E71",
  };

  return (
    <>
      <h2 style={{ color: "#284B63", textShadow: "3px 3px 3px #D9D9D9" }}>
        Signup
      </h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Username</Label>
          <Input innerRef={usernameRef} placeholder="Enter Username" />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input
            innerRef={emailRef}
            placeholder="example@email.com"
            type="email"
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            innerRef={passwordRef}
            placeholder="Enter Password"
            type="password"
          />
        </FormGroup>
        <FormGroup>
          <Label>Zipcode</Label>
          <Input
            type="text"
            pattern="[0-9]{5}"
            maxLength={5}
            innerRef={locationZipRef}
            placeholder="Enter your 5-digit zipcode"
            // type='number'
          />
        </FormGroup>
        <FullButton>
          <Button type="submit" style={style}>
            <strong>Signup</strong>
          </Button>
        </FullButton>
      </Form>
    </>
  );
}

export default Signup;
