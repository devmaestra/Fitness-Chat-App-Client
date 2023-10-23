import React, { useRef } from "react";
import FullButton from "../../buttons/FullButton";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const locationZipRef = useRef();
  const activityBioRef = useRef();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const locationZip = locationZipRef.current.value;
    const activityBio = activityBioRef.current.value;

    let bodyObj = JSON.stringify({
      username: username,
      email: email,
      password: password,
      locationZip: locationZip,
      activityBio: activityBio,
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
        navigate("/matches");
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
    color: "#284B63",
    borderColor: "#284B63",
  };

  return (
    <>
      <h2 style={{ color: "#284B63", textShadow: "3px 3px 3px #D9D9D9" }}>
        <strong>Signup</strong>
      </h2>
      <br />
      <Form className="form-inline" onSubmit={handleSubmit}>
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
        <FormGroup>
          <Label>Activity Bio</Label>
          <p style={{ fontSize: "small", text: "muted" }}>
            This will be seen by people you are matched with, so add your
            favorite fitness activites here!
          </p>
          <Input
            innerRef={activityBioRef}
            maxLength={30}
            placeholder="List 1-3 fitness activities you enjoy."
            type="text"
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
