import React from "react";
import PropTypes from "prop-types";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "./ChangeProvider";

const DashboardCard = ({ icon, name, value, percentage }) => {
  const gradient = `radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 50%, ${icon.gradient} 100%)`;
  const iconStyle = {
    background: gradient,
    color: icon.gradient,
  };
  const progressStyle = {
    height: window.innerWidth < 1100 ? "45px" : "55px",
    width: window.innerWidth < 1100 ? "45px" : "55px",
  };
  const progressColors = {
    textColor: "#fff",
    trailColor: "transparent",
    // pathColor: icon.gradient,
    pathColor: "white",
    backgroundColor: icon.gradient,
    // trailColor: "rgba(0,0,0,0.1)",
  };

  return (
    <div className="dashboard-card mybox-shadow mb-4 flex items-center h-32 2xl:w-64 md:h-24 justify-between bg-white  rounded-lg overflow-hidden p-1">
      <div className="flex items-center">
        <div
          className="dashboard-card-icon p-2 rounded-full flex items-center justify-center"
          style={iconStyle}
        >
          <span className={"text-2xl"}>{icon.icon}</span>
        </div>
        <div className="dashboard-card-content p-2 ">
          <div
            className="dashboard-card-name flex items-center text-gray-600  leading-3"
            style={{ fontSize: "10px" }}
          >
            {name}
          </div>
          <div className="dashboard-card-value text-xl font-semibold">
            {value}
          </div>
        </div>
      </div>
      <div className="dashboard-card-progress p-4 px-2">
        <div className="mx-auto" style={progressStyle}>
          <ChangingProgressProvider values={[0, 20, 40, 60, 80, 100]}>
            {(percentage) => (
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                background
                backgroundPadding={6}
                styles={buildStyles({
                  ...progressColors,
                  textColor: "#fff",
                })}
              />
            )}
          </ChangingProgressProvider>
        </div>
      </div>
    </div>
  );
};

DashboardCard.propTypes = {
  icon: PropTypes.shape({
    className: PropTypes.string.isRequired,
    gradient: PropTypes.string.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.number.isRequired,
};

export default DashboardCard;
