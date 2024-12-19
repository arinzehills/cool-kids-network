import { renderHook, act } from "@testing-library/react";
import { useGet } from "../useGet";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/Toast/Toast";

// Mock dependencies
jest.mock("axios");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));
jest.mock("../../components/Toast/Toast", () => ({
  FireError: jest.fn(),
}));

// Mock window.baseUrl
window.baseUrl = "https://api.example.com";

// Mock localStorage
const mockLocalStorageData = {
  token: "mock-token",
  user: { id: 1, name: "Test User" },
};

const localStorageMock = {
  getItem: jest.fn((key) => JSON.stringify(mockLocalStorageData[key])),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("useGet Hook", () => {
  const navigate = jest.fn();
  const mockEndpoint = "/test-endpoint";
  const mockData = { data: { id: 1, name: "Test Data" } };

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockReturnValue(navigate);
  });

  it("should fetch data successfully on mount when runImmediately is true", async () => {
    axios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useGet(mockEndpoint, true));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBe(null);

    // Wait for the async operation to complete
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(axios.get).toHaveBeenCalledWith(`${window.baseUrl}${mockEndpoint}`, {
      headers: {
        Authorization: `Bearer ${mockLocalStorageData.token}`,
      },
    });
    expect(result.current.data).toEqual(mockData.data);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("should not fetch data on mount when runImmediately is false", () => {
    renderHook(() => useGet(mockEndpoint, false));

    expect(axios.get).not.toHaveBeenCalled();
  });

  it("should handle 401 unauthorized error correctly", async () => {
    const unauthorizedError = {
      response: {
        status: 401,
        message: "Unauthorized access",
        data: {
          message: "Unauthorized access",
        },
      },
    };
    axios.get.mockRejectedValueOnce(unauthorizedError);

    const { result } = renderHook(() => useGet(mockEndpoint));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.error).toBe(unauthorizedError.message);
  });

  it("should handle general errors correctly", async () => {
    const generalError = {
      message: "Network Error",
      response: {
        data: {
          message: "Something went wrong",
        },
      },
    };
    axios.get.mockRejectedValueOnce(generalError);

    const { result } = renderHook(() => useGet(mockEndpoint));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.error).toBe(generalError.message);
  });

  it("should refetch data when calling refetch function", async () => {
    axios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useGet(mockEndpoint, false));

    await act(async () => {
      result.current.refetch();
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.data).toEqual(mockData.data);
    expect(result.current.isLoading).toBe(false);
  });

  it("should update when endpoint changes", async () => {
    const newEndpoint = "/new-endpoint";
    const newMockData = { data: { id: 2, name: "New Test Data" } };

    axios.get
      .mockResolvedValueOnce({ data: mockData })
      .mockResolvedValueOnce({ data: newMockData });

    const { result, rerender } = renderHook(
      ({ endpoint }) => useGet(endpoint),
      {
        initialProps: { endpoint: mockEndpoint },
      }
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.data).toEqual(mockData.data);

    rerender({ endpoint: newEndpoint });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(axios.get).toHaveBeenCalledWith(
      `${window.baseUrl}${newEndpoint}`,
      expect.any(Object)
    );
    expect(result.current.data).toEqual(newMockData.data);
  });
});
