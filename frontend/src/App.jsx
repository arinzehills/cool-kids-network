import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardIndex from "./pages/dashboard";
import PrivateRoute from "./pages/dashboard/PrivateRoute";
import AdminDashboard from "./pages/dashboard/admin/AdminDashboard";
import Users from "./pages/dashboard/users/Users";
import Profile from "./pages/dashboard/profile/Profile";
import DashboardHome from "./pages/dashboard/home/DashboardHome";
import Dashboard from "./pages/dashboard/dashboard/Dashboard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ToastContainer style={{ zIndex: 9999999999 }} />

      <Router>
        {/* Wrap everything inside Router */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardIndex />}>
              <Route index element={<Dashboard />} />
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            {/* <Route path="settings" element={<SettingsComponent />} /> */}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
