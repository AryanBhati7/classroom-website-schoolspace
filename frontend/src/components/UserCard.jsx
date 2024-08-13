import React from "react";

function getRandomColor() {
  const colors = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function UserCard({ ...user }) {
  const avatarColor = getRandomColor();
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex items-center px-6 py-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${avatarColor}`}
        >
          <span className="text-xl font-bold">
            {name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
          <p className="text-gray-600">{email}</p>
          <p className="text-gray-600">{role}</p>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
