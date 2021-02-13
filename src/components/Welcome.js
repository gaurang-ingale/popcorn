import React from "react";
import "../styles/welcome.css";

function Welcome(props) {
  return (
    <div className="welcome">
      <h1>Welcome to PopcornDb!</h1>
      <p>
        Please use the search box above, to search for a movie or show by name.
      </p>
    </div>
  );
}

export default Welcome;
