// hooks/usePost.js
import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import axios from "axios";
import Toast from "../components/Toast/Toast";

export const usePost = () => {
  const [token] = useLocalStorage("token", "");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (endpoint, body) => {
    console.log("BASE ", `${window.baseUrl + endpoint}`);
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${window.baseUrl + endpoint}`, body, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      setData(response.data); // Set the response data
      Toast.FireSuccess({ message: response?.data?.message || "Success" });
    } catch (error) {
      console.log("ERROR", error?.response.data.message);
      setError(error.response?.data?.message || error.message);
      if (error.response?.status === 401) {
        Toast.FireError({
          title: "Login to continue",
          message: error?.response?.data?.message || error.message,
        });
        // navigate("/login");
      } else {
        Toast.FireError({
          message: error?.response?.data?.message || error.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, execute };
};
