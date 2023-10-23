import React from "react";
import Logo from "../../header/Logo";

const style = {
  alignItems: "center",
  justifyContent: "center",
  margin: "70px",
};

function LoggedOut() {
  return (
    <div>
      <h1 style={style}>See You Next Time!</h1>
      <br />
      <br />
      <Logo />
      <br />
    </div>
  );
}

export default LoggedOut;
