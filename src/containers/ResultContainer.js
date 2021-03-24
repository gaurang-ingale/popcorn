import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Result from "../components/Result";
import ResultDetail from "../components/ResultDetail";
import "../styles/result_container.css";

function ResultContainer(props) {
  const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
  const API_BASE_URL = "http://www.omdbapi.com/?apikey=" + API_KEY;

  const params = useParams();

  const [data, setData] = useState({ Response: "" });
  const errorOutput = (
    <p className="error_output">
      No results could be found for your search. :(
    </p>
  );

  const searching = (
    <p className="searching">
      Please search for a movie/series. If you already have searched, the result
      is being processed. :)
    </p>
  );

  useEffect(() => {
    if (!(typeof props.name === "string") && !params.name) {
      return;
    }

    const searchName =
      typeof props.name === "string" && props.name === ""
        ? params.name
        : props.name;

    if (params.name === "" && !params.name) {
      return;
    }

    const abortController = new AbortController();

    const fetchResponse = async () => {
      try {
        const ret = await fetch(`${API_BASE_URL}&t=${searchName}`, {
          signal: abortController.signal,
        }).then((response) => response.json());
        setData(ret);
      } catch (e) {
        if (!abortController.signal.aborted) {
          throw e;
        }
      }
    };

    fetchResponse();

    return () => abortController.abort();
  }, [props.name]);

  const getOutput = () => {
    if (data.Response === "False") {
      return errorOutput;
    } else if (data.Response === "") {
      return searching;
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
