import React, { useEffect } from "react";

const ProfileComponent = ({ user, isForTable, isVertical }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [showFullName, setShowFullName] = React.useState(true);

  let fullName = user?.full_name ?? "";
  const renderName = () => {
    if (window.innerWidth > 659 && !isForTable) {
      return fullName;
    } else if (isForTable) {
      const firstName = fullName.split(" ")[0];
      return firstName;
    } else {
      return "";
    }
  };
  useEffect(() => {
    setShowFullName(!showFullName);
  }, [window.innerWidth]);
  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={isForTable ? null : () => setIsExpanded(true)}
      // onMouseLeave={() => isForTable && setIsExpanded(false)}
      onClick={isForTable ? null : handleExpand}
    >
      <div
        className={`flex items-center ${
          isVertical && "flex-col justify-center gap-4 text-2xl font-semibold"
        }`}
      >
        <div
          className={`bg-cover bg-center rounded-full ${
            isForTable ? "h-6 w-6" : "h-10 w-10"
          } flex items-center justify-center mr-2`}
          style={{
            backgroundImage: 'url("/images/admin_profile_cover.jpg")',
          }}
        >
          <span
            className={`text-white font-medium ${
              isForTable ? "text-sm" : "text-lg"
            }`}
          >
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt=""
                className={`rounded-full ${
                  isForTable ? "h-6 w-6" : "h-10 w-10"
                }`}
              />
            ) : (
              fullName
                .split(" ")
                .map((name) => name.charAt(0).toUpperCase())
                .join("")
            )}
          </span>
        </div>
        {/* <span className="text-sm font-medium truncate">{fullName}</span>
         */}
        <div className="ml-2 hidden sm:block">{renderName()}</div>
        <div className="ml-2 sm:hidden">{renderName()}</div>
      </div>
      <span
        className={`${
          isExpanded ? "block" : "hidden"
        } duration-300 absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg z-10`}
      >
        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none">
          Profile
        </button>
        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none">
          Settings
        </button>
        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none">
          Logout
        </button>
      </span>
    </div>
  );
};

export default ProfileComponent;
