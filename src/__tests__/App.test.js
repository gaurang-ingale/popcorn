import App from "../App";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import server from "../handlers/handlers";
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

test("searches with search box correctly (click the search button)", async () => {
  const fetchSpy = jest.spyOn(global, "fetch");

  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  await waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(0));

  userEvent.type(screen.getByPlaceholderText("Movie name"), "bleach");
  userEvent.click(screen.getByDisplayValue("Search"));

  await waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(1));

  expect(
    await screen.findByText(/Please search for a movie\/series/)
  ).toBeInTheDocument();

  expect(await screen.findByText(/Title:/)).toBeInTheDocument();
  expect(await screen.findByText(/Bleach/)).toBeInTheDocument();
});
