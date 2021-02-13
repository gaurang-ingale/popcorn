import React from "react";
import ResultDetail from "./ResultDetail";
import "../styles/result.css";

function Result(props) {
  return (
    <div className="result">
      <h2>
        <strong>Title:</strong> Looper
      </h2>
      <ResultDetail name="Year" value="2012" />
      <ResultDetail name="Rated" value="R" />
      <ResultDetail name="Released" value="28 Sep 2012" />
    </div>
  );
}

export default Result;
