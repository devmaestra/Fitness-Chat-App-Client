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
} from "reactstrap";

function CardTemplate({ username, userImage, locationZip, cityName }) {
  return (
    <div>
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
            <Button>Chat with {username}!</Button>
          </CardBody>
        </Card>
      </CardGroup>
    </div>
  );
}

export default CardTemplate;
