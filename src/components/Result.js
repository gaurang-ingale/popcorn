import React from "react";
import ResultDetail from "./ResultDetail";
import "../styles/result.css";

function Result(props) {
  return (
    <div className="outer">
      <h2>
        <strong>Title:</strong> Looper
      </h2>
      <div className="box">
        <img
          src="https://m.media-amazon.com/images/M/MV5BMTg5NTA3NTg4NF5BMl5BanBnXkFtZTcwNTA0NDYzOA@@._V1_SX300.jpg"
          alt="Poster"
        />
        <div className="description">
          <ResultDetail name="Year" value="2012" />
          <ResultDetail name="Rated" value="R" />
          <ResultDetail name="Released" value="28 Sep 2012" />
        </div>
      </div>
    </div>
  );
}

export default Result;
