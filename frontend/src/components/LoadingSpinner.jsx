import React from "react";

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-20 h-20 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
    </div>
  );
}

export default LoadingSpinner;
