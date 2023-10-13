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

function CardTemplate({
  username,
  userImage,
  locationZip,
  cityName,
  isSelected,
  onClick,
  onCreateConvoClick,
  onCancelClick,
}) {
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
                width: "250px",
                height: "250px",
                objectFit: "cover",
                objectPosition: "top"
              }}
              src={userImage || "/assets/User-Profile-PNG-Image.png"}
              alt={username}
              onClick={onClick}
            />
            <CardBody>
              <CardTitle tag="h1">{username}</CardTitle>
              <CardSubtitle className="mb-2" tag="h4">
                Nearby in: {locationZip}
              </CardSubtitle>
              <CardText>{cityName}</CardText>
              <Button
                className="chat-btn"
                color={isSelected ? "success" : "primary"}
                onClick={isSelected ? onCreateConvoClick : onClick}
              >
                {isSelected ? "Create Convo" : `Chat with ${username}!`}
              </Button>
              {isSelected && (
                <Button color="danger" onClick={onCancelClick}>
                  Cancel
                </Button>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <br />
    </div>
  );
}

export default CardTemplate;
