import React from "react";

const Schedule = ({ item, index }) => (
  <li
    key={index}
    className="flex items-center justify-between bg-blue-100 text-blue-900 rounded-lg p-2 shadow-md"
  >
    <span className="font-semibold">{item.days}</span>
    <span className="text-md">
      {item.startTime} - {item.endTime}
    </span>
  </li>
);

export default Schedule;
