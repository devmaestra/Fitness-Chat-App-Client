import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

function ProfileCardTemplate({
  username,
  userImage,
  locationZip,
  cityName,
  activityBio,
  onEditProfileClick,
}) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card className="shadow-4"
            style={{
              margin: "3vh",
              marginTop: "7vh",
              background: "#ffffff",
              boxShadow: "0 2px 15px -3px",
            }}
          >
        <CardImg
          className="mt-3 card-image shadow-4-strong rounded-6"
          style={{
            display: "block",

            width: "250px",
            height: "250px",
            objectFit: "cover",
            objectPosition: "top",
            margin: "auto"
          }}
          src={userImage || "/assets/User-Profile-PNG-Image.png"}
          alt={username}
        />
        <CardBody>
          <CardTitle tag="h1">{username}</CardTitle>
          <CardSubtitle className="mb-2" tag="h4">
            Your Zip Code: {locationZip}
          </CardSubtitle>
          {/* <CardSubtitle className="mb-2" tag="h4">
            City: {cityName}
          </CardSubtitle> */}
          <CardSubtitle className="mb-2" tag="h4">
            Activities: {activityBio}
          </CardSubtitle>
        </CardBody>
      </Card>
    </div>
  );
}

export default ProfileCardTemplate;
