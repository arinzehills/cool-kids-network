import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

// Mock the dependencies
jest.mock("react-toastify", () => ({
  ToastContainer: () => null,
  toast: () => jest.fn(),
}));

test("renders the correct content", () => {
  render(<App />);
  const textElement = screen.getByText("Hello Informations");
  expect(textElement).toBeInTheDocument();
});
