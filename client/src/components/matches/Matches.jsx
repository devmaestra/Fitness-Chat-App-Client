import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "reactstrap";
import { baseURL } from "../../utils";
import CardTemplate from "../card/CardTemplate";
import { useNavigate } from "react-router-dom";


let userName;
let userId;
let userZip;

function Matches(props) {
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null); // To store the selected user
  const [showCreateButton, setShowCreateButton] = useState(false);
  const navigate = useNavigate();


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
      console.log("Matches Says USERID is ", response.data.userId);
      console.log("Matches Says USERNAME is ", response.data.userName);
      console.log("Matches Says USERZIP is ", response.data.userZip);

      userId = response.data.userId;
      userName = response.data.userName;
      userZip = response.data.userZip;
      console.log("Const Says USERID is ", userId);
      console.log("Const Says USERNAME is ", userName);
      console.log("Const Says USERZIP is ", userZip);

      // Set the matched users in the state
      setMatchedUsers(response.data.getMatchByZip || []); // Use an empty array as a fallback
    } catch (error) {
      console.error("Error fetching matched users:", error);
    }
  };

  // Function to handle creating a new conversation
  const createConversation = async () => {
    
    if (selectedUserId) {
      try {
        // Create the title by concatenating usernames
        const title = `${userName} with ${
          matchedUsers.find((user) => user._id === selectedUserId).username
        }`;

        // Make the POST request to create the conversation
        const response = await axios.post(
          `${baseURL}/conversation`,
          {
            title,
            users: [userId, selectedUserId],
          },
          {
            headers: {
              Authorization: `${props.token}`,
            },
          }
        );

        console.log("Response from creating conversation:", response.data);

        navigate('/myconversations')

        // Handle any further actions here, such as redirecting to the new conversation page.
        // You can use response.data.newConversation to access the created conversation.

        // Clear the selected user and hide the "Create Convo" button
        setSelectedUserId(null);
        setShowCreateButton(false);
      } catch (error) {
        console.error("Error creating conversation:", error);
      }
    }
  };

  useEffect(() => {
    // Call the fetchMatches function when the component mounts
    fetchMatches();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Function to handle selecting a user
  const selectUser = (user) => {
    setSelectedUserId(user ? user._id : null);
    setShowCreateButton(!!user); // Show the "Create Convo" button if a user is selected
  };

  return (
    <div>
      <br />
      <h1 style={{ color: "#284B63", textShadow: "3px 3px 3px #D9D9D9" }}>
        Your Nearby Matches to {userZip}
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
            cityName={user.cityName}
            isSelected={selectedUserId === user._id}
            // Pass the functions to handle card click and button click
            onClick={() => selectUser(user)}
            onCreateConvoClick={() => createConversation(user)}
            onCancelClick={() => selectUser(null)} // This cancels the selection
          />
        ))}
      </div>
      {selectedUserId && (
        <div>
          
          {/* <h3>
            Selected User:{" "}
            {matchedUsers.find((user) => user._id === selectedUserId).username}
          </h3>
          <button onClick={() => setSelectedUserId(null)}>Cancel</button> */}

        </div>
      )}
    </div>
  );
}

export default Matches;
