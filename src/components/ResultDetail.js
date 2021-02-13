import React from "react";

function ResultDetail(props) {
  return (
    <p>
      <strong>{props.name + ": "}</strong>
      {props.value}
    </p>
  );
}

export default ResultDetail;
