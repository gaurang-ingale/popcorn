import React from "react";

function NavBar(props) {
  return (
    <nav className="nav">
      <a href="www.google.com" className="logo nav_item">
        Popcorn<strong>Db</strong>
      </a>
      <p className="nav_item">About</p>
      <input className="nav_item" type="text" />
      <button className="nav_item search">Search</button>
    </nav>
  );
}

export default NavBar;
