import React from "react";
import { useSelector } from "react-redux";
import {
  LandingPage,
  Logo,
  UserCard,
  Sidebar,
  PrincipalDashboard,
  OrganizationStats,
  TeacherDashboard,
  StudentDashboard,
} from "../components";

function Home() {
  const authStatus = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.user);

  if (!authStatus) {
    return <LandingPage />;
  }

  return (
    <div className="flex flex-col min-h-[90vh] bg-gray-100">
      <div className="flex flex-1">
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-8 bg-white shadow-lg rounded-lg m-3 flex flex-col">
          <div className="flex flex-row justify-between">
            <OrganizationStats />
            <div className="w-full md:w-1/3 mt-8 md:mt-0">
              <UserCard user={user} />
            </div>
          </div>
          <div className="w-full mt-10">
            {user.role === "PRINCIPAL" && <PrincipalDashboard />}
            {user.role === "TEACHER" && <TeacherDashboard />}
            {user.role === "STUDENT" && <StudentDashboard />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
