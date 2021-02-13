import React from "react";
import ResultDetail from "./ResultDetail";
import "../styles/result.css";

function Result(props) {
  return (
    <div className="outer">
      <h2>
        <strong>Title: </strong>
        {props.title}
      </h2>
      <div className="box">
        <img src={props.img} alt="Poster" />
        <div className="description">{props.description}</div>
      </div>
      <h3>Ratings</h3>
      {props.ratings}
    </div>
  );
}

export default Result;
