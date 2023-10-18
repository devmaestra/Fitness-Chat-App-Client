import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import FullButton from "../buttons/FullButton";
import ProfilePic from "./ProfilePic";
import { baseURL } from "../environments";

function EditProfile(props) {
  const { user } = useParams();
  const usernameRef = useRef();
  const emailRef = useRef();
  const locationZipRef = useRef();
  const activityBioRef = useRef();
  // const { id } = useParams();
  console.log(props);
  const url = `${baseURL}/user/edit`;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [locationZip, setLocationZip] = useState("");
  const [activityBio, setActivityBio] = useState("");

  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: new Headers({
          Authorization: props.token,
        }),
      });

      const data = await res.json();

      console.log(data);

      const { username, email, locationZip, activityBio } = data.getUser;

      setUsername(username);
      setEmail(email);
      setLocationZip(locationZip);
      setActivityBio(activityBio);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (props.token) {
      fetchUser();
    } else {
      return (
        <div>
          <p>Please log in to edit your profile.</p>
        </div>
      );
    }
  }, [props.token]);

  async function handleSubmit(e) {
    e.preventDefault();

    let bodyObj = JSON.stringify({
      username: username,
      email: email,
      locationZip: locationZip,
      activityBio: activityBio,
    });

    const requestOptions = {
      headers: new Headers({
        Authorization: props.token,
        "Content-Type": "application/json",
      }),
      body: bodyObj,
      method: "PATCH",
    };

    try {
      const res = await fetch(url, requestOptions);
      const data = await res.json();

      console.log(data);
      alert(`${data.message}`);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function deleteUser(id) {
    const url = `${baseURL}/user/${id}`;

    console.log(url);

    let requestOption = {
      headers: new Headers({
        Authorization: props.token,
      }),
      method: "DELETE",
    };

    try {
      let res = await fetch(url, requestOption);
      let data = await res.json();

      if (data) {
        props.fetchUser();
      }
    } catch (err) {
      console.error(err.message);
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
      <h2
        style={{
          color: "#284B63",
          textAlign: "center",
          textDecoration: "underline",
          textShadow: "3px 3px 3px #D9D9D9",
        }}
      >
        <strong>Edit Profile</strong>
      </h2>
      <br />
      <Container>
        <Row>
          <Col md="8">
            <ProfilePic />
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Username</Label>
                <Input
                  value={username}
                  innerRef={usernameRef}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={email}
                  innerRef={emailRef}
                  onChange={(e) => setEmail(e.target.value)}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label>Location Zip Code</Label>
                <Input
                  type="text"
                  pattern="[0-9]{5}"
                  maxLength={5}
                  value={locationZip}
                  innerRef={locationZipRef}
                  onChange={(e) => setLocationZip(e.target.value)}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label>Activity Bio</Label>
                <p style={{ fontSize: "small", text: "muted" }}>
                  This will be seen by people you are matched with, so add your
                  favorite fitness activites here!
                </p>
                <Input
                  type="text"
                  maxLength={30}
                  value={activityBio}
                  innerRef={activityBioRef}
                  onChange={(e) => setActivityBio(e.target.value)}
                />
              </FormGroup>
              <FullButton>
                <Button type="submit" style={style}>
                  <strong>Update</strong>
                </Button>
              </FullButton>
            </Form>
          </Col>
          <FullButton>
            <Button onClick={() => navigate("/profile")}>
              Back to Profile Home
            </Button>
          </FullButton>
          <Button onClick={() => deleteUser(user._id)} color="danger">
            Delete My Account
          </Button>
        </Row>
      </Container>
    </>
  );
}

export default EditProfile;
