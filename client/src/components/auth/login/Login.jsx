import React, { useRef } from "react";
import FullButton from "../../buttons/FullButton";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";

function Login({ updateToken }) {
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    //needs to match postman body
    let body = JSON.stringify({
      email,
      password,
    });

    const url = "http://localhost:4001/user/login";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json", // thing to append to
        }),
        body: body,
      });

      const data = await res.json();
      console.log(data);
      console.log("User ID is:", data.user._id);
      console.log("User Name is:", data.user.username);

      if (data.message === "Success!") {
        updateToken(data.token);
        console.log("Navigating to /matches");
        navigate("/matches");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

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
        <strong>Login</strong>
      </h2>
      <br />
      <Form className="form-inline center" onSubmit={handleSubmit}>
        <FormGroup>
          <Label className="">Email</Label>
          <Input innerRef={emailRef} type="email" placeholder="Email" />
        </FormGroup>

        <FormGroup>
          <Label>Password</Label>
          <Input
            innerRef={passwordRef}
            type="password"
            placeholder="Enter Password"
          />
        </FormGroup>
        <FullButton>
          <Button type="submit" style={style}>
            <strong>Login</strong>
          </Button>
        </FullButton>
      </Form>
    </>
  );
}

export default Login;
