import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaUsers,
  FaCalendarAlt,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLogout } from "../hooks/auth.hook";
import { setUser } from "../features/authSlice.js";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [activePath, setActivePath] = useState(location.pathname);

  const handleNavigation = (path) => {
    setActivePath(path);
    navigate(path);
  };

  const getIconClass = (path) =>
    `text-4xl md:text-5xl mb-6 cursor-pointer p-2 ${
      activePath === path
        ? "bg-blue-400 rounded-lg"
        : "hover:bg-blue-200 hover:rounded-lg"
    }`;

  const { mutateAsync: logout, isPending } = useLogout();

  const handleLogout = async () => {
    const res = await logout();
    if (res) {
      navigate("/");
      dispatch(setUser(null));
    }
  };

  return (
    <div className="w-16 m-3 rounded-lg  mr-0 md:w-20 bg-white shadow-lg flex flex-col items-center py-4">
      <FaHome
        className={getIconClass("/")}
        title="Home"
        onClick={() => handleNavigation("/")}
      />
      <FaChalkboardTeacher
        className={`${getIconClass("/classrooms")} ${
          user?.role !== "PRINCIPAL" && "hidden"
        }`}
        title="Classrooms"
        onClick={() => handleNavigation("/classrooms")}
      />
      <FaUsers
        className={`${getIconClass("/teachers")} ${
          user?.role !== "PRINCIPAL" && "hidden"
        }`}
        title="Teachers"
        onClick={() => handleNavigation("/teachers")}
      />
      <FaUserGraduate
        className={`${getIconClass("/students")} ${
          user?.role !== "PRINCIPAL" && "hidden"
        }`}
        title="Students"
        onClick={() => handleNavigation("/students")}
      />
      <FaCalendarAlt
        className={getIconClass("/timetable")}
        title="Timetable"
        onClick={() => handleNavigation("/timetable")}
      />
      <div className="flex-grow"></div>
      <FaSignOutAlt
        onClick={handleLogout}
        className="text-4xl mt-48 md:text-5xl mb-3 cursor-pointer hover:bg-red-300 text-red-600 hover:rounded-lg p-2"
        title="Logout"
      />
    </div>
  );
}

export default Sidebar;
