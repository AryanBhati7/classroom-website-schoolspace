import React from "react";
import { useSelector } from "react-redux";
import {
  LandingPage,
  Logo,
  UserCard,
  Sidebar,
  PrincipalDashboard,
} from "../components";

function Home() {
  const authStatus = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.user);
  const organization = "Your Organization"; // Replace with actual organization data
  const numberOfClassrooms = 10; // Replace with actual data
  const numberOfTeachers = 5; // Replace with actual data
  const numberOfStudents = 100; // Replace with actual data
  console.log(authStatus);
  if (!authStatus) {
    return <LandingPage />;
  }

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="flex flex-1">
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-8 bg-white shadow-lg rounded-lg m-3 flex flex-col">
          <div className="flex flex-row">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-6 text-gray-800">
                {organization.toUpperCase()}
              </h1>
              <div className="space-y-4">
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Number of Classrooms:</span>{" "}
                  {numberOfClassrooms}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Number of Teachers:</span>{" "}
                  {numberOfTeachers}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Number of Students:</span>{" "}
                  {numberOfStudents}
                </p>
              </div>
            </div>
            <div className="flex-none w-full md:w-1/3 mt-8 md:mt-0">
              <UserCard user={user} />
            </div>
          </div>
          <div className="w-full mt-10">
            <PrincipalDashboard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
