import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import FullButton from "../buttons/FullButton";
import ProfilePic from "./ProfilePic";
import { baseURL } from "../environments";

function EditProfile(props) {
  console.log('Profile component is rendering.');
  console.log(props);
  // const { userData } = props; // Destructure userData from props
  // const [token, setToken] = useState(localStorage.getItem('token') || '');
  // console.log(userData);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [locationZip, setLocationZip] = useState("");
  const [activityBio, setActivityBio] = useState("");
  const [userImage, setUserImage] = useState("")
  const [imgURL, setImgURL] = useState("")

    // Update the token state if it changes in local storage
  // useEffect(() => {
  //   const storedToken = localStorage.getItem('token');
  //   if (storedToken && storedToken !== token) {
  //     setToken(storedToken);
  //   }
  // }, [token]);

  //AWS UPDATE PROFILE PIC!
  // const handlePicUpload = async (e) => {
  //   e.preventDefault();
  
  //   const url = `${baseURL}/user/${user._id}/edit`;
  
  //   const requestOptions = {
  //     headers: new Headers({
  //       Authorization: props.token,
  //       "Content-Type": "application/json",
  //     }),
  //     method: "PATCH",
  //     body: JSON.stringify({
  //       userImage: imgURL,
  //     }),
  //   };
  
  //   try {
  //     const res = await fetch(url, requestOptions);
  //     const data = await res.json();
  
  //     if (res.status === 200) {
  //       // Update userImage state on successful update
  //       setUserImage(imgURL);
  //       console.log("Profile picture updated successfully");
  //     } else {
  //       console.error(data.message);
  //     }
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };
  
  //AWS UPDATE PROFILE PIC ENDS*
  

  useEffect(() => {
    // Fetch the logged-in user's data
    fetchUserData();
  
    async function fetchUserData() {
      try {
        const url = `${baseURL}/user/loggeduser`;
  
        const res = await fetch(url, {
          method: "GET",
          headers: new Headers({
            Authorization: props.token,
          }),
        });
  
        if (res.status === 200) {
          const data = await res.json();
  
          // Update the form fields with user data
          setUser(data);
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setLocationZip(data.locationZip);
          setActivityBio(data.activityBio);
          setUserImage(data.userImage); // Update to use userImage
        } else {
          console.log("User data not found");
        }
      } catch (err) {
        console.error(err.message);
      }
    }
  }, [props.token]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const url = `${baseURL}/user/${user._id}/edit`;
  
    const requestOptions = {
      headers: new Headers({
        Authorization: props.token,
        "Content-Type": "application/json",
      }),
      method: "PATCH",
      body: JSON.stringify({
        locationZip,
        activityBio,
      }),
    };
  
    try {
      const res = await fetch(url, requestOptions);
      const data = await res.json();
  
      if (res.status === 200) {
        console.log(data.message);
        alert(`${data.message}`);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDeleteProfile = async () => {
    const url = `${baseURL}/user/${user._id}`;

    const requestOptions = {
      headers: new Headers({
        Authorization: props.token,
      }),
      method: "DELETE",
    };

    try {
      const res = await fetch(url, requestOptions);
      const data = await res.json();

      if (res.status === 200) {
        console.log(data.message);
        alert(`${data.message}`);
        // Redirect or perform any other necessary actions after profile deletion
        navigate("/"); // Example: Redirect to the login page
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

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
      <Container>
        {/* <Row> */}
          {/* <Col md="6"> */}
      <h2
        style={{
          color: "#284B63",
          textAlign: "center",
          // textDecoration: "underline",
          textShadow: "3px 3px 3px #D9D9D9",
        }}
      >
        <strong>Edit Profile</strong>
      </h2>
      <br />
      <ProfilePic
          userId={user ? user._id : null} // Pass user ID to ProfilePic
          token={props.token}
        />
        {userImage && <img src={userImage} alt="Profile" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
      {/* <ProfilePic userId={user._id} token={props.token} /> */}


            <br />
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>First Name</Label>
                <Input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Last Name</Label>
                <Input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Location Zip Code</Label>
                <Input
                  type="text"
                  pattern="[0-9]{5}"
                  maxLength={5}
                  value={locationZip}
                  onChange={(e) => setLocationZip(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Activities</Label>
                <p style={{ fontSize: "small", color: "muted" }}>
                  (This will be seen by people you are matched with, so add your
                  favorite fitness activities here!)
                </p>
                <Input
                  type="text"
                  maxLength={30}
                  value={activityBio}
                  onChange={(e) => setActivityBio(e.target.value)}
                />
              </FormGroup>
              <FullButton>
                <Button type="submit" style={style}>
                  <strong>Update</strong>
                </Button>
              </FullButton>
            </Form>
          <FullButton>
            <Button onClick={() => navigate("/profile")}>
              Back to Profile Home
            </Button>
          </FullButton>
          <Button onClick={handleDeleteProfile} color="danger">
            Delete My Account
          </Button>
          {/* </Col> */}
        {/* </Row> */}
      </Container>
    </>
  );
}

export default EditProfile;