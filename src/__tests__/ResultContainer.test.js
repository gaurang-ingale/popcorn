import React from "react";
import server from "../handlers/handlers";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Route } from "react-router-dom";
import ResultContainer from "../containers/ResultContainer";
import { createMemoryHistory } from "history";

beforeEach(() => {
  jest.resetModules();
  delete window.location;
  window.history = createMemoryHistory();
  // @ts-ignore
  window.location = new URL("http://localhost:3000/");
});

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
