import { render, act, screen } from "@testing-library/react";
import { useState } from "react";
import { useLocalStorage } from "../useLocalStorage";

// Mocking localStorage
beforeAll(() => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn(),
      setItem: jest.fn(),
    },
    writable: true,
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test("should return initial value when no value is in localStorage", () => {
  localStorage.getItem.mockReturnValueOnce(null);

  const TestComponent = () => {
    const [value] = useLocalStorage("myKey", "default");
    return <div>{value}</div>;
  };

  render(<TestComponent />);

  expect(screen.getByText("default")).toBeInTheDocument();
});

test("should retrieve value from localStorage if it exists", () => {
  localStorage.getItem.mockReturnValueOnce(JSON.stringify("storedValue"));

  const TestComponent = () => {
    const [value] = useLocalStorage("myKey", "default");
    return <div>{value}</div>;
  };

  render(<TestComponent />);

  expect(screen.getByText("storedValue")).toBeInTheDocument();
});

test("should store value in localStorage when state changes", () => {
  const TestComponent = () => {
    const [value, setValue] = useLocalStorage("myKey", "default");
    return (
      <div>
        <span>{value}</span>
        <button onClick={() => setValue("newValue")}>Change Value</button>
      </div>
    );
  };

  render(<TestComponent />);

  const button = screen.getByText("Change Value");
  act(() => {
    button.click();
  });
  expect(localStorage.setItem).toHaveBeenCalledWith(
    "myKey",
    JSON.stringify("newValue")
  );
});

test("should handle JSON parsing errors gracefully", () => {
  localStorage.getItem.mockReturnValueOnce("invalidJSON");

  const TestComponent = () => {
    const [value] = useLocalStorage("myKey", "default");
    return <div>{value}</div>;
  };

  render(<TestComponent />);
  expect(screen.getByText("default")).toBeInTheDocument();
});
