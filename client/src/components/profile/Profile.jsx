import React, { useEffect, useState } from "react";
import { baseURL } from "../../utils";
import ProfileCardTemplate from "../card/ProfileCardTemplate";
import {
  Container,
  Row,
  Col,
  CardBody,
  CardText,
  Card,
  Button,
} from "reactstrap";
import { useNavigate, Link, Route } from "react-router-dom";
import EditProfile from "./EditProfile";

function Profile(props) {
  const [user, setUser] = useState([]);
  //   id: " ",
  //   username: " ",
  //   email: " ",
  //   locationZip: " ",
  //   activityBio: " ",
  // });

  const navigate = useNavigate();

  const fetchUser = async () => {
    const url = `${baseURL}/user/loggeduser`;
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: new Headers({
          Authorization: props.token,
        }),
      });
      const data = await res.json();
      setUser(data);
      console.log(data);
      console.log(user);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (props.token) {
      fetchUser();
    }
  }, [props.token]);

  // useEffect(() => {
  //   navigate("/profile");
  // }, [navigate]);

  // const navigateToEditProfile = () => {
  //   navigate("/edit-profile");
  // };
  // setSelectedUserId(null);

  return (
    <div>
      {/* // className="userProfile" */}
      <section style={{ backgroundColor: "#FF6F59" }}>
        <Container className="py-5">
          <Row>
            <Col lg="4">
              <ProfileCardTemplate
                token={props.token}
                key={user._id}
                userImage={user.userImage}
                username={user.username}
                locationZip={user.locationZip}
                activityBio={user.activityBio}
              />
            </Col>
            <Col lg="8">
              <Card className="mb-4">
                <CardBody>
                  <Row>
                    <Col sm="3">
                      <CardText>Username</CardText>
                    </Col>
                    <Col sm="9">
                      <CardText className="text-muted">
                        {user.username}
                      </CardText>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col sm="3">
                      <CardText>Email</CardText>
                    </Col>
                    <Col sm="9">
                      <CardText className="text-muted">{user.email}</CardText>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col sm="3">
                      <CardText>Location Zip Code</CardText>
                    </Col>
                    <Col sm="9">
                      <CardText className="text-muted">
                        {user.locationZip}
                      </CardText>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col sm="3">
                      <CardText>Activiy Bio</CardText>
                    </Col>
                    <Col sm="9">
                      <CardText className="text-muted">
                        {user.activityBio}
                      </CardText>
                    </Col>
                  </Row>
                  <hr />
                  <Button>
                    <Link to="/profile/edit-profile">Edit Profile</Link>
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Profile;
