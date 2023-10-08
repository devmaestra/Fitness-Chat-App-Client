import React from "react";
import {
  CardGroup,
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

function CardTemplate({ username, userImage, locationZip, cityName }) {
  return (
    <div>
      <Row classname="">
        <Col>
          <Card style={{ margin: "10px" }}>
            <CardImg
              className="card-image"
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
              <CardText>{cityName}</CardText>
              <Button
                className="chat-btn"
                color="success"
                onClick="PLACEHOLDER for chat conversation"
              >
                Chat with {username}!
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
