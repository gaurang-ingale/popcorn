import React from "react";
import "../styles/navbar.css";

function NavBar(props) {
  return (
    <nav className="nav">
      <a href="/" className="logo nav_item">
        Popcorn<strong>Db</strong>
      </a>
      <a href="/" className="nav_item">
        About
      </a>
      <input className="nav_item" type="text" />
      <button className="nav_item search">Search</button>
    </nav>
  );
}

export default NavBar;
