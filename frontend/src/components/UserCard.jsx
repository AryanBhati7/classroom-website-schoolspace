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

function UserCard({ user }) {
  const avatarColor = getRandomColor();

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex flex-col items-center px-6 py-4">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center text-white ${avatarColor} mb-4`}
        >
          <span className="text-2xl font-bold">
            {user?.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">{user?.name}</h2>
          <p className="text-gray-600">{user?.email}</p>
          <p className="text-gray-600">{user?.role}</p>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
