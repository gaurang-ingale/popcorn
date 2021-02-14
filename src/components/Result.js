import React from "react";
import "../styles/result.css";

function Result(props) {
  return (
    <div className="outer">
      <h2>
        <strong>Title: </strong>
        {props.title}
      </h2>
      <div className="box">
        <div>
          <img src={props.img} alt="Poster" />
        </div>
        <div className="description">{props.description}</div>
        <div>
          <h3>Ratings</h3>
          {props.ratings}
        </div>
      </div>
    </div>
  );
}

export default Result;
