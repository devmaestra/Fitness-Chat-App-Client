import React from "react";
// import Logo from "../../header/Logo";
import logoMakeLarge from "./logoMakeLarge.png";

const style = {
  alignItems: "center",
  justifyContent: "center",
  margin: "70px",
};

const logoStyle = {
  display: "block",   // Ensure the image is treated as a block element
  margin: "0 auto",   // Center the image horizontally
  width: "75vw",     // Set the width to 75% of viewport width
  maxWidth: "400px" // Set maximum width to 400px
};

function LoggedOut() {
  return (
    <div>
      <h1 style={style}>See You Next Time!</h1>
      <br />
      <br />
      {/* Use the imported image and apply the styling */}
      <img src={logoMakeLarge} alt="Logo" style={logoStyle} />
      <br />
    </div>
  );
}

export default LoggedOut;
