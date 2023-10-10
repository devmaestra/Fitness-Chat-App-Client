import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Col,
  Row,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function CardTemplate({ username, userImage, locationZip, activityBio }) {
  return (
    <div>
      <Row classname="row gx-5" style={{ display: "inline" }}>
        <Col>
          <Card
            classname="shadow-4"
            style={{
              margin: "10px",
              background: "#D9D9D9",
              boxShadow: "0 2px 15px -3px",
            }}
          >
            <CardImg
              className="mt-3 bg-image hover-zoom mx-3 shadow-4-strong rounded-6"
              style={{
                width: "250px",
                height: "250px",
              }}
              src={userImage || "/assets/User-Profile-PNG-Image.png"}
              alt={username}
            />
            <CardBody>
              <CardTitle tag="h1">{username}</CardTitle>
              <CardSubtitle className="mb-2" tag="h4">
                Nearby in: {locationZip}
              </CardSubtitle>
              <CardText style={{ width: "200px", marginLeft: "25px" }}>
                {activityBio}
              </CardText>
              <Button
                className="chat-btn"
                onClick="PLACEHOLDER for chat conversation"
                style={{
                  background: "#284B63",
                }}
              >
                <strong>Chat with {username}!</strong>
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <br />
    </div>
  );
}

export default CardTemplate;
