import React from "react";
import ProfileComponent from "./ProfileComponent";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const NavComponent = () => {
  const [user, setUser] = useLocalStorage("user", "");

  return (
    <div className="flex justify-between items-center h-16 text-gray p-12 pt-6">
      <div className="flex items-center">
        <div className="text-lg font-bold leading-5">
          Hello Mike
          <br />
          <span className="text-sm font-normal">Welcome back</span>
        </div>
      </div>
      <div className="flex items-center">
        <div className="mr-4 hidden sm:block">
          <input
            type="text"
            placeholder="Search..."
            className="bg-blue-200/50 rounded-full py-2 px-4 text-gray-500 w-64 focus:outline-none"
          />
        </div>
        <div className="mr-4">
          <button>
            <svg
              className="w-6 h-6 fill-current text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 22a2 2 0 01-2-2h4a2 2 0 01-2 2zm5.89-8.45A10 10 0 0013 2h-2a10 10 0 00-4.89 11.55L3.69 17.7A1 1 0 004 19h16a1 1 0 00.31-1.3l-1.42-2.25zM12 4a8 8 0 018 8h-2a6 6 0 00-6-6V4z" />
            </svg>
          </button>
        </div>
        <div>
          <ProfileComponent user={user} isForTable={false} />
        </div>
      </div>
    </div>
  );
};

export default NavComponent;
