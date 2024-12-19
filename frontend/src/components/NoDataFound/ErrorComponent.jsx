import { Icon } from "@iconify/react";
import React from "react";

const ErrorComponent = ({ error, type }) => {
  return type == "text" ? (
    <span style={{ fontSize: 13, color: "coral" }}>{error}</span>
  ) : (
    <div className="bg-white flex justify-center items-center p-12">
      <div
        className="flex items-center justify-center flex-col text-8xl"
        style={{ color: "var(--danger)" }}
      >
        <Icon icon="material-symbols:error-rounded" />
        <h1 className="text-xl">{error ?? "Network error"}</h1>
      </div>
    </div>
  );
};

export default ErrorComponent;
