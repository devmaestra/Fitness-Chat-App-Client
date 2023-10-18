import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/header/Header";
import Nav from "./components/nav/Nav";
import Auth from "./components/auth/Auth";
import Matches from "./components/matches/Matches";
import Profile from "./components/profile/Profile";
import { Route, Routes } from "react-router-dom";
import ConversationTable from "./components/conversations/ConversationTable";
import { baseURL } from "./components/environments/index";
import EditProfile from "./components/profile/EditProfile";

function App() {
  const [sessionToken, setSessionToken] = useState("");
  const [userData, setUserData] = useState(null);

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);

    setSessionToken(newToken);
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${baseURL}/user/loggeduser`, {
        method: "GET",
        headers: {
          Authorization: sessionToken,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch user data. Status: ${response.status}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));

      fetchUserData()
        .then((userData) => {
          if (userData) {
            setUserData(userData);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Auth updateToken={updateToken} />} />
        <Route path="/matches" element={<Matches token={sessionToken} />} />
        <Route path="/profile" element={<Profile token={sessionToken} />} />
        <Route
          path="/profile/edit-profile"
          element={<EditProfile token={sessionToken} />}
        />
        <Route
          path="/myconversations"
          element={
            <ConversationTable token={sessionToken} userData={userData} />
          }
        />
      </Routes>
      {sessionToken !== "" ? <Nav /> : null}
      <Nav setSessionToken={setSessionToken} />
    </div>
  );
}

export default App;
