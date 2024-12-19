import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import Toast from "../components/Toast/Toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useGet = (endpoint, runImmediately = true) => {
  const [token] = useLocalStorage("token", null);
  const [user, setUser] = useLocalStorage("user", null);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${window.baseUrl + endpoint}`, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      console.log("DATA fetched:", response.data?.data);
      setData(response.data?.data);
    } catch (err) {
      console.log("PLEASE 401 is here", err?.status);
      if (error?.status === 401) {
        Toast.FireError({
          title: "Login to continue",
          message: error?.response?.data?.message || error?.message,
        });
        navigate("/login");
      } else {
        Toast.FireError({
          message: error?.response?.data?.message || error?.message,
        });
      }
      setError(err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (runImmediately) {
      fetchData();
    }
  }, [endpoint]); // Triggers on mount and when endpoint changes

  return { data, error, isLoading, refetch: fetchData };
};
