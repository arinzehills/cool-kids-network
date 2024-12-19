import Lottie from "lottie-react";
import React from "react";

const NoDataFound = ({ message }) => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        {/* <Lottie
          animationData={"/lottie/noitems.json"}
          // loop={true}
          // style={{ width: "40%" }}
          className="sm:w-1/5 md:w-2/6"
        /> */}
        <span className="italics" style={{ fontSize: "14px" }}>
          {message ?? "No Data Found"}
        </span>
      </div>
    </div>
  );
};

export default NoDataFound;
