import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import ResultContainer from "../containers/ResultContainer";
import userEvent from "@testing-library/user-event";
import App from "../App";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const bleach = {
  Title: "Bleach",
  Year: "2004–2012",
  Rated: "TV-14",
  Released: "09 Sep 2006",
  Runtime: "24 min",
  Genre: "Animation, Action, Adventure, Fantasy",
  Director: "N/A",
  Writer: "Tite Kubo",
  Actors: "Johnny Yong Bosch, Michelle Ruff, Stephanie Sheh, Jamieson Price",
  Plot:
    'High school student Ichigo Kurosaki, who has the ability to see ghosts, gains soul reaper powers from Rukia Kuchiki and sets out to save the world from "Hollows".',
  Language: "Japanese",
  Country: "Japan",
  Awards: "2 wins & 8 nominations.",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BZjE0YjVjODQtZGY2NS00MDcyLThhMDAtZGQwMTZiOWNmNjRiXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
  Ratings: [
    {
      Source: "Internet Movie Database",
      Value: "8.1/10",
    },
  ],
  Metascore: "N/A",
  imdbRating: "8.1",
  imdbVotes: "44,491",
  imdbID: "tt0434665",
  Type: "series",
  totalSeasons: "16",
  Response: "True",
};

const movieNotFound = {
  Response: "False",
  Error: "Movie not found!",
};

const incorrectId = {
  Response: "False",
  Error: "Incorrect IMDb ID.",
};

//Setup a server with the required handlers
const server = setupServer(
  rest.get("http://www.omdbapi.com/", (req, res, ctx) => {
    const api_key_from_request = req.url.searchParams.get("apikey");

    const searchedTitle = req.url.searchParams.get("t");

    console.log(req.url.searchParams.getAll("t"));

    if (api_key_from_request !== API_KEY) {
      return;
    }

    if (searchedTitle === "bleach") {
      return res(ctx.json(bleach), ctx.status(200));
    } else if (searchedTitle === "somethingnothing") {
      return res(ctx.json(movieNotFound), ctx.status(200));
    } else if (searchedTitle === "") {
      return res(ctx.json(incorrectId), ctx.status(200));
    }

    return res(ctx.json(incorrectId), ctx.status(200));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('Displays the error message when the show/movie does not exist (Response: "False")', async () => {
  render(
    <MemoryRouter>
      <ResultContainer name="somethingnothing" />
    </MemoryRouter>
  );

  //screen.debug();

  expect(
    await screen.findByText(/No results could be found for your search./)
  ).toBeInTheDocument();

  //screen.debug();
});

test("searches with url directly (dynamic url)", async () => {
  const getSpy = jest.spyOn(global, "fetch");

  render(
    <MemoryRouter initialEntries={["/search/bleach"]}>
      <Route path="/search/:name">
        <ResultContainer name="" />
      </Route>
    </MemoryRouter>
  );

  //screen.debug();

  await waitFor(() => expect(getSpy).toHaveBeenCalledTimes(1));

  expect(await screen.findByText(/Title:/)).toBeInTheDocument();
  expect(await screen.findByText(/Bleach/)).toBeInTheDocument();
});

test("shows blank page for path '/search/'", async () => {
  const getSpy = jest.spyOn(global, "fetch");

  render(
    <MemoryRouter initialEntries={["/search/"]}>
      <Route path="/search/:name">
        <ResultContainer name="" />
      </Route>
    </MemoryRouter>
  );

  //screen.debug();

  await waitFor(() => expect(getSpy).toHaveBeenCalledTimes(0));

  expect(screen.queryByText(/Title:/)).toBeNull();
  expect(
    screen.queryByText(/No results could be found for your search./)
  ).toBeNull();
});

test("searches with search box correctly (click the search button)", async () => {
  const fetchSpy = jest.spyOn(global, "fetch");
  const getSpy = jest.fn();

  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  screen.debug();

  await waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(0));

  userEvent.type(screen.getByPlaceholderText("Movie name"), "bleach");
  userEvent.click(screen.getByDisplayValue("Search"));

  await waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(1));

  expect(await screen.findByText(/Title:/)).toBeInTheDocument();
  expect(await screen.findByText(/Bleach/)).toBeInTheDocument();
});
