import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import "../styles/navbar.css";

function NavBar(props) {
  const location = useLocation();
  const history = useHistory();
  const params = useParams();

  const nameFromParams = params.name ? params.name : "";
  const [name, setName] = useState(nameFromParams);

  const submitHandler = (event) => {
    event.preventDefault();
    if (!(location === `/search/${name}`)) {
      history.push(`/search/${name}`);
    }
    props.onChange();
  };

  const changeHandler = (event) => {
    setName(event.target.value);
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
        <input
          className="nav_item"
          id="search"
          type="text"
          value={name}
          onChange={changeHandler}
        />
        <input
          className="nav_item search_button"
          type="submit"
          value="Search"
        />
      </form>
    </nav>
  );
}

export default NavBar;
