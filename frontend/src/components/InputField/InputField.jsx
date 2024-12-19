import React from "react";
import { toCamelCase } from "../../../utils/toCamelCase";

const InputField = ({
  type,
  height = "28",
  width,
  transparent,
  name,
  label,
  placeholder,
  value,
  onChange,
  prefixIcon,
  suffixIcon,
  onSuffixIconClick,
}) => {
  const widthClass = width ? `w-${width}` : "w-full";
  const backgroundColor = transparent ? "bg-transparent" : "bg-grey-700";
  const prefixIconClass = prefixIcon
    ? "absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400"
    : "";
  const suffixIconClass = suffixIcon
    ? "absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400 cursor-pointer"
    : "";

  return (
    <div className="relative" onClick={onSuffixIconClick}>
      {label && (
        <label htmlFor={label} className="block text-left font-bold mb-2">
          {toCamelCase(label) + ":"}
        </label>
      )}
      <div className="relative">
        {prefixIcon && <span className={prefixIconClass}>{prefixIcon}</span>}
        <input
          type={type}
          id={label}
          name={name}
          placeholder={placeholder}
          style={{ paddingLeft: prefixIcon && "2rem" }}
          className={`pl-${prefixIcon ? "10" : "3"} pr-${
            suffixIcon ? "10" : "3"
          } h-${height} ${widthClass} px-3 py-2 rounded-md border-gray-100 border-2 ${backgroundColor} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          value={value}
          onChange={onChange}
        />
        {suffixIcon && (
          <span className={suffixIconClass} onClick={onSuffixIconClick}>
            {suffixIcon}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputField;
