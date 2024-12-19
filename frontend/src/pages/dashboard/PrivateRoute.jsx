import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const PrivateRoute = () => {
  const [token, setToken] = useLocalStorage("token", "");

  return !token ? <Navigate to={"/login"} /> : <Outlet />;
};

export default PrivateRoute;
