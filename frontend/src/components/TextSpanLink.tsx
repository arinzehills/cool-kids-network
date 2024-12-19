import React from "react";
import { Link } from "react-router-dom";

interface TextSpanLinkProps {
  linkText: string;
  href: string;
  questionText: string;
  textColor?: string;
  linkColor?: string;
}

const TextSpanLink: React.FC<TextSpanLinkProps> = ({
  linkText,
  href,
  questionText,
  textColor = "#191919",
  linkColor = "text-red-600",
}) => {
  return (
    <div className="w-full flex justify-center items-center my-2">
      <p className={`text-[${textColor}]`}>
        {questionText}{" "}
        <Link to={href} className={`font-black cursor-pointer ${linkColor}`}>
          {linkText}
        </Link>
      </p>
    </div>
  );
};

export default TextSpanLink;
