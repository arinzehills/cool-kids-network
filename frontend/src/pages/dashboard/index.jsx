import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import { Icon } from "@iconify/react";
import { filterLinksByRole } from "./Sidebar/roleBasedLinks";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const DashboardIndex = () => {
  const [collapsed, setCollapsed] = useState(true);
  const handleToggle = () => setCollapsed(!collapsed);
  const [user, setUser] = useLocalStorage("user", "");

  const links = [
    {
      name: "Admin",
      url: "/dashboard/admin",
      icon: <Icon icon="ri:dashboard-fill" />,
    },
    {
      name: "Home",
      url: "/dashboard",
      icon: <Icon icon="hugeicons:home-04" width="24" height="24" />,
    },
    {
      name: "Users",
      url: "/Dashboard/users",
      icon: <Icon icon="ph:users-fill" />,
    },
    // {
    //   name: "Play Game",
    //   url: "/Dashboard/games",
    //   icon: <Icon icon="ph:users-fill" />,
    // },
    {
      name: "Profile",
      url: "/dashboard/profile",
      icon: <Icon icon="ci:settings-filled" />,
    },
  ];

  const filteredLinks = filterLinksByRole(links, user?.role);

  return (
    <>
      <Sidebar
        links={filteredLinks}
        handleToggle={handleToggle}
        collapsed={collapsed}
        children={
          <Outlet
          // context={[click, setClick]}
          />
        }
      />
    </>
  );
};

export default DashboardIndex;
