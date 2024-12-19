import { render, act, screen } from "@testing-library/react";
import { usePost } from "../usePost";
import axios from "axios";

import Toast from "../../components/Toast/Toast";
import { useLocalStorage } from "../useLocalStorage";

// Mocking the Toast and axios instances
jest.mock("axios");
jest.mock("../../components/Toast/Toast");
jest.mock("../useLocalStorage");

describe("usePost", () => {
  // Setup
  const mockSetToken = jest.fn();
  const mockSetData = jest.fn();
  const mockSetError = jest.fn();
  const mockSetIsLoading = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useLocalStorage.mockReturnValue(["test_token", mockSetToken]);
    Toast.FireSuccess.mockImplementation(() => {});
    Toast.FireError.mockImplementation(() => {});
  });

  test("should execute a successful API call", async () => {
    const mockResponse = { data: { message: "Success", data: "Some data" } };
    axios.post.mockResolvedValueOnce(mockResponse); // Simulating a successful response

    const TestComponent = () => {
      const { data, error, isLoading, execute } = usePost();
      return (
        <div>
          <button onClick={() => execute("/test", { body: "data" })}>
            Call API
          </button>
          {isLoading && <span>Loading...</span>}
          {error && <span>Error: {error}</span>}
          {data && <span>{data.message}</span>}
        </div>
      );
    };

    render(<TestComponent />);
    const button = screen.getByText("Call API");

    // Trigger the API call
    act(() => {
      button.click();
    });

    // Check if the loading state is shown
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for the API call to finish and check for success message
    await act(async () => {});

    // Check that the success message appears
    expect(screen.getByText("Success")).toBeInTheDocument();

    // Ensure axios.post and Toast.FireSuccess were called
    expect(axios.post).toHaveBeenCalledWith(
      `${window.baseUrl}/test`,
      { body: "data" },
      expect.objectContaining({
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          Authorization: "Bearer test_token",
        }),
      })
    );
    expect(Toast.FireSuccess).toHaveBeenCalledWith({
      message: "Success",
    });
  });

  test("should handle API call failure", async () => {
    const mockError = { response: { data: { message: "Failed" } } };
    axios.post.mockRejectedValueOnce(mockError); // Simulating an error response

    const TestComponent = () => {
      const { data, error, isLoading, execute } = usePost();
      return (
        <div>
          <button onClick={() => execute("/test", { body: "data" })}>
            Call API
          </button>
          {isLoading && <span>Loading...</span>}
          {error && <span>{error}</span>}
          {data && <span>{data.message}</span>}
        </div>
      );
    };

    render(<TestComponent />);
    const button = screen.getByText("Call API");

    // Trigger the API call
    act(() => {
      button.click();
    });

    // Check if the loading state is shown
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for the API call to finish and check for error message
    await act(async () => {});

    // Check that the error message appears
    expect(screen.getByText("Failed")).toBeInTheDocument();

    // Ensure axios.post and Toast.FireError were called
    expect(axios.post).toHaveBeenCalledWith(
      `${window.baseUrl}/test`,
      { body: "data" },
      expect.objectContaining({
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          Authorization: "Bearer test_token",
        }),
      })
    );
    expect(Toast.FireError).toHaveBeenCalledWith({
      message: "Failed",
    });
  });

  test("should set isLoading correctly during API call", async () => {
    const mockResponse = { data: { message: "Success" } };
    axios.post.mockResolvedValueOnce(mockResponse);

    const TestComponent = () => {
      const { isLoading, execute } = usePost();
      return (
        <div>
          <button onClick={() => execute("/test", { body: "data" })}>
            Call API
          </button>
          {isLoading && <span>Loading...</span>}
        </div>
      );
    };

    render(<TestComponent />);
    const button = screen.getByText("Call API");

    // Trigger the API call
    act(() => {
      button.click();
    });

    // Ensure loading state is shown during the API call
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for the API call to finish
    await act(async () => {});

    // Ensure loading state is removed after the API call
    expect(screen.queryByText("Loading...")).toBeNull();
  });
});
