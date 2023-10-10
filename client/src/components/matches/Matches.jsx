import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "reactstrap";
import { baseURL } from "../../utils";
import CardTemplate from "../card/CardTemplate";

function Matches(props) {
  const [matchedUsers, setMatchedUsers] = useState([]);
  // console.log(props.token);

  // Define the fetchMatches function
  const fetchMatches = async () => {
    try {
      // Make an HTTP GET request to fetch matched users
      const response = await axios.get(`${baseURL}/user/matches`, {
        headers: {
          Authorization: `${props.token}`, // Include the token in the "Authorization" header
        },
      });

      console.log("Response from server:", response.data); // Log the response data

      // Set the matched users in the state
      setMatchedUsers(response.data.getMatchByZip || []); // Use empty array as a fallback
    } catch (error) {
      console.error("Error fetching matched users:", error);
    }
  };

  useEffect(() => {
    // Call the fetchMatches function when the component mounts
    fetchMatches();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      <br />
      <h1 style={{ color: "#284B63", textShadow: "3px 3px 3px #D9D9D9" }}>
        Your Nearby Matches
      </h1>
      <br />
      <Button
        style={{ background: "#3C6E71", boxShadow: "1px 1px 10px 1px grey" }}
        size="lg"
        onClick={fetchMatches}
      >
        <strong>Find My SwoulMates!</strong>
      </Button>
      <div className="card-container">
        {/* Map through matchedUsers and render a Card for each user */}
        {matchedUsers.map((user) => (
          <CardTemplate
            key={user._id}
            userImage={user.userImage}
            username={user.username}
            locationZip={user.locationZip}
            activityBio={user.activityBio} //add to user signup?
          />
        ))}
      </div>
    </div>
  );
}

export default Matches;
