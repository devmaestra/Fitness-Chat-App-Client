import React, { useState, useEffect } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Col,
  Row,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from "react-router-dom";
import { baseURL } from "../environments";

function ProfileCardTemplate(props) {
  // const navigate = useNavigate();
  const [user, setUser] = useState([]);
  //   username: "",
  //   userImage: "",
  //   locationZip: "",
  //   cityName: "",
  //   activityBio: "",
  // });

  useEffect(() => {
    fetch(`${baseURL}/user/loggeduser`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log(response);
        return response.json();
      })
      .then((data) => {
        setUser(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
      });
  }, [props.token]);

  return (
    <div>
      <Row className="row gx-5" style={{ display: "inline" }}>
        <Col>
          <Card
            className="shadow-4"
            style={{
              margin: "10px",
              background: "#D9D9D9",
              boxShadow: "0 2px 15px -3px",
            }}
          >
            <CardImg
              className="mt-3 bg-image hover-zoom mx-3 shadow-4-strong rounded-6"
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                objectPosition: "top",
              }}
              src={user.userImage || "/assets/User-Profile-PNG-Image.png"}
              alt={user.username}
            />
            <CardBody>
              <CardTitle tag="h1">{user.username}</CardTitle>
              <CardSubtitle className="mb-2" tag="h4">
                Your ZipCode: {user.locationZip}
              </CardSubtitle>
              <CardText>{user.cityName}</CardText>
              <CardText style={{ width: "200px", marginLeft: "25px" }}>
                {user.activityBio}
              </CardText>
            </CardBody>
          </Card>
          {/* <CardTemplate
            username={user.username}
            userImage={user.userImage}
            locationZip={user.locationZip}
            cityName={user.cityName}
            activityBio={user.activityBio}
            isSelected={true} // You can set isSelected to true if it's the logged-in user
            onClick={() => {}}
            onEditProfileClick={() => {
              navigate("./edit-profile");
            }}
          /> */}
        </Col>
      </Row>
      <br />
    </div>
  );
}

export default ProfileCardTemplate;
