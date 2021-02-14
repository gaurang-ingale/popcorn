import React, { useState, useEffect } from "react";
import Result from "../components/Result";
import ResultDetail from "../components/ResultDetail";
import "../styles/result_container.css";

function ResultContainer(props) {
  const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
  const API_BASE_URL = "http://www.omdbapi.com/?apikey=" + API_KEY;

  const [data, setData] = useState({ Response: "False" });
  const errorOutput = (
    <p className="error_output">
      No results could be found for your search. :(
    </p>
  );

  useEffect(() => {
    if (!(typeof props.name === "string") || props.name === "") {
      return;
    }

    const fetchResponse = async () => {
      const ret = await fetch(
        `${API_BASE_URL}&t=${props.name}`
      ).then((response) => response.json());
      setData(ret);
    };

    fetchResponse();
  }, []);

  const getOutput = () => {
    if (data.Response === "False") {
      return errorOutput;
    } else {
      const description = Object.entries(data).map((element, index) => {
        const [key, value] = element;
        if (
          key !== "Title" &&
          key !== "Poster" &&
          key !== "Response" &&
          key !== "Ratings"
        ) {
          return <ResultDetail key={index} name={key} value={value} />;
        } else {
          return null;
        }
      });

      const ratingsArray = data["Ratings"];
      const ratings = [];
      for (let i = 0; i < ratingsArray.length; i++) {
        ratings.push(
          <ResultDetail
            key={i}
            name={ratingsArray[i]["Source"]}
            value={ratingsArray[i]["Value"]}
          />
        );
      }
      let output = (
        <Result
          title={data.Title}
          img={data.Poster}
          description={description}
          ratings={ratings}
        />
      );
      return output;
    }
  };

  return getOutput();
}

export default ResultContainer;
