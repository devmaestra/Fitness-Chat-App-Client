import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../card/Card"; // Ensure that the path to 'Card' is correct

function Matches() {
  const [matchedUsers, setMatchedUsers] = useState([]);

  // Define the fetchMatches function
  const fetchMatches = async () => {
    try {
      // Make an HTTP GET request to fetch matched users
      const response = await axios.get("http://localhost:4001/user/matches"); // Ensure you have the correct URL

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
      <h2>Your Matches</h2>
      <button onClick={fetchMatches}>Match Me</button>
      <div className="card-container">
        {/* Map through matchedUsers and render a Card for each user */}
        {matchedUsers.map((user) => (
          <Card key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Matches;
