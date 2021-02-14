import React from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import "../styles/navbar.css";

function NavBar(props) {
  const location = useLocation();
  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    if (!(location.pathname === "/search")) {
      history.push("/search");
    }
    props.onChange();
  };

  return (
    <nav className="nav">
      <a href="/" className="logo nav_item">
        Popcorn<strong>Db</strong>
      </a>
      <a href="/" className="nav_item">
        About
      </a>
      <a href="/" className="nav_item">
        Advanced Search
      </a>
      <form onSubmit={submitHandler}>
        <input className="nav_item" id="search" type="text" />
        <input className="nav_item search" type="submit" value="Search" />
      </form>
    </nav>
  );
}

export default NavBar;
