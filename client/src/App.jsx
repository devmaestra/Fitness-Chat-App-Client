import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import ProfilePic from "./components/profile/ProfilePic";
import ForgotPassword from "./components/auth/forgotPassword/ForgotPassword";

function App() {
  return (
    <div className="App">
      Swoulmates
      <ProfilePic />
      <Routes>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
      </Routes>
    </div>
  );
}

export default App;
