import React from "react";
import Logo from "./Logo";

function Header(props) {
  return (
    <div className="header">
      <h1>
        <Logo />
      </h1>
      <p></p>
      <h3 className="h3"> </h3>
    </div>
  );
}

export default Header;
