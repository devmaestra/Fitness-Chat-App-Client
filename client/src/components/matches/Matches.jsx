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
      <h2>Your Nearby Matches</h2>
      <Button color="success" size="lg" onClick={fetchMatches}>
        <strong>Match Me</strong>
      </Button>
      <div className="card-container">
        {/* Map through matchedUsers and render a Card for each user */}
        {matchedUsers.map((user) => (
          <CardTemplate
            key={user._id}
            userImage={user.userImage}
            username={user.username}
            locationZip={user.locationZip}
            cityName={user.cityName}
          />
        ))}
      </div>
    </div>
  );
}

export default Matches;