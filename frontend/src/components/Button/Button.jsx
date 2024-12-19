import React from "react";
import "./Button.css";
import Loading from "../Loading/Loading";

const Button = ({
  color,
  width,
  height,
  children,
  isCircular,
  buttonColor,
  buttonStyle,
  loading,
  onClick,
  disable,
  prefixIcon,
  suffixIcon,
  style,
  ...rest
}) => {
  const styles = `flex items-center  justify-center bg-${color}-500 $hover:bg-${color}-700  font-bold py-2 px-4 ${
    isCircular ? "rounded-full" : "rounded"
  }`;
  const widthStyle = width ? `w-${width}` : "w-full";
  // const heightStyle = height ? `h-${height}` : "h-16";
  const STYLE = buttonStyle ? `${buttonStyle} text-gray-200` : "";
  const COLOR = buttonColor ? buttonColor : " ";
  const classNames = `h-16 ${COLOR} ${STYLE}  inline-block ${styles} ${widthStyle}  `;

  return (
    <button
      className={classNames}
      {...rest}
      onClick={loading || disable ? null : onClick}
      style={{
        ...style,
        opacity: disable && 0.3,
        // background:
        //   buttonColor === "btn-orange"
        //     ? "var(--orange-gradient)"
        //     : "var(--purple-gradient)",
      }}
    >
      {loading ? (
        <div className="centerClass items-start -mt-6 -ml-8 ">
          <Loading height={20} isTicks={true} className={"centerClass"} />
        </div>
      ) : (
        <>
          {prefixIcon && (
            <span className="mr-2">{/* Add prefix icon here */}</span>
          )}

          <span> {children}</span>
          {suffixIcon && (
            <span className="ml-2">
              {/* Add suffix icon here */}
              {suffixIcon}
            </span>
          )}
        </>
      )}
    </button>
  );
};

export default Button;
