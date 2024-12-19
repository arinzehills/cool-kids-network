import React from "react";
import "./Loading.css";
import "./Second.css";

const Loading = ({ isTicks, height, className }) => {
  return (
    <div className={className}>
      {!isTicks ? (
        <div
          class="loadingio-spinner-double-ring-2ll2zpwl0cy"
          style={{ height: height }}
        >
          <div className="ldio-gkmvno3v208">
            <div></div>
            <div></div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default Loading;
