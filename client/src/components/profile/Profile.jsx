import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import ProfileCardTemplate from "../card/ProfileCardTemplate"; // Import the CardTemplate component
import { Link } from "react-router-dom"; // Import Link for routing

import axios from "axios";
import { baseURL } from "../../utils";

function Profile(props) {
  const [userData, setUserData] = useState(null);
  // console.log(userData)
  console.log(props);
  console.log(userData);
  console.log(props.token);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseURL}/user/loggeduser`, {
          headers: {
            Authorization: props.token, // Include the token in the "Authorization" header
          },
        });

        if (response.data) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [props.token]);

  return (
    <div>
      {userData && (
        <ProfileCardTemplate
          username={userData.username}
          userImage={userData.userImage}
          locationZip={userData.locationZip}
          cityName={userData.cityName}
          activityBio={userData.activityBio}
          // Include any other properties from your user data
        />
      )}
      {/* <br /> */}
      <Link to="/profile/edit-profile">
        <Button color="primary" >Edit Profile</Button>
      </Link>
    </div>
  );
}

export default Profile;
