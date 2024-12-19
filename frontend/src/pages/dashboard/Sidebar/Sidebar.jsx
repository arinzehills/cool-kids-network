import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import Button from "../../../components/Button/Button";
import NavComponent from "../../../components/NavComponent/NavComponent";

const Sidebar = ({ links, collapsed, handleToggle, children }) => {
  const navigate = useNavigate();
  const [urlIndex, setUrlIndex] = useState(0);
  const [user, setUser] = useLocalStorage("user", "");
  const location = useLocation();

  const handleLinkClick = (url, urlIndex) => {
    if (url === "/dashboard") {
      navigate.push(url);
    }
    setUrlIndex(urlIndex);
  };
  const showOnMobile = () => {
    if (!collapsed) {
      return "hidden";
    } else {
      return "block";
    }
  };

  const handleLogout = () => {
    console.log(user);
    navigate("/");
    setUser(null);
  };
  return (
    <>
      <div className="flex duration-300 h-screen overflow-hidden">
        {window.innerWidth < 600 && (
          <div
            className="absolute cursor-pointer rounded text-blue-500 bg-white left-3 top-3 md:-right-9 top-9 w-17 border-2 border-orange-500 p-2"
            onClick={handleToggle}
          >
            <Icon
              icon="mingcute:list-collapse-fill"
              className={`${!collapsed && "rotate-180 duration-100"}`}
            />
          </div>
        )}
        <div
          className={`${
            collapsed ? "w-68" : "w-24"
          } duration-300 h-screen pt-4 relative ${
            window.innerWidth < 600 && showOnMobile()
          }`}
          style={{ background: "var(--darkBlue)" }}
        >
          <div
            className="absolute cursor-pointer rounded text-blue-500 bg-white -right-3 md:-right-9 top-9 w-17 border-2 border-orange-500 p-2"
            onClick={handleToggle}
          >
            <Icon
              icon="mingcute:list-collapse-fill"
              className={`${!collapsed && "rotate-180 duration-100"}`}
            />
          </div>
          <div className="flex gap-x-1 items-center text-black bg-white">
            <img
              src="/images/brainworld-logo.png"
              className={`cursor-pointer duration-500 h-16 ${
                collapsed && "rotate-[360deg]"
              }`}
              alt=""
            />
            {
              <h3 className={`duration-300  ${!collapsed && "scale-0"}`}>
                Brainworld Admin
              </h3>
            }
          </div>
          <div className="flex flex-col space-y-4">
            <ul className="links mt-6 m-2">
              {links.map((link, index) => (
                <li
                  key={index}
                  className={`${
                    location.pathname === link.url && "bg-indigo-200/50"
                  } mt-2 pl-4 text-gray-300 text-sm p-3 hover:bg-indigo-200/50  rounded-md`}
                >
                  <Link
                    to={link.url}
                    onClick={() => handleLinkClick(link.url, index)}
                    className="flex items-center font-semibold gap-x-4"
                  >
                    <span
                      className={`${
                        !collapsed ? "block" : "block"
                      } pl-2 text-2xl`}
                    >
                      {link.icon}
                    </span>
                    <span
                      className={`${
                        !collapsed && "hidden"
                      } duration-300  origin-left pl-2 text-sm`}
                    >
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            {/* logout button */}
            <div className="absolute bottom-9 pl-8 duration-300">
              <Button
                buttonColor={"btn-orange"}
                width={!collapsed ? "12" : "24"}
                onClick={handleLogout}
              >
                {!collapsed ? (
                  <Icon icon="ant-design:logout-outlined" />
                ) : (
                  "Logout"
                )}
              </Button>
            </div>
          </div>
        </div>
        {/* Other Pages */}
        <div className="p-2 flex-1 overflow-scroll bg-gray-950">
          <div className="">
            <NavComponent />
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
