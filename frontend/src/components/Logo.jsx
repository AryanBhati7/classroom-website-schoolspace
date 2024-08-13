import React from "react";

function Logo({ className }) {
  return (
    <div
      className={`text-3xl font-bold text-blue-500 w-full flex justify-center items-center ${className}`}
    >
      School<span className="text-purple-500">Space</span>
    </div>
  );
}

export default Logo;
