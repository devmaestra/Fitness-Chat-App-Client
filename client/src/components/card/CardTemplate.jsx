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
      <Row>
        <Col className="col-6">
          <CardGroup>
            <Card>
              <CardImg
                src={userImage || "/assets/User-Profile-PNG-Image.png"}
                alt={username}
              />
              <CardBody>
                <CardTitle tag="h1">{username}</CardTitle>
                <CardSubtitle className="mb-2" tag="h4">
                  Nearby in: {locationZip}
                </CardSubtitle>
                <CardText>{cityName}</CardText>
                <Button className="chat-btn" color="success">
                  Chat with {username}!
                </Button>
              </CardBody>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </div>
  );
}

export default CardTemplate;
