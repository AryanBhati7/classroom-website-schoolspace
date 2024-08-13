import React from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/auth.hook";
import LoadingSpinner from "./LoadingSpinner";

function LandingPage() {
  const { mutateAsync: loginUser, isPending } = useLogin();

  const data = {
    email: "principal@classroom.com",
    password: "Admin",
  };
  const handleDemoTour = async () => {
    const res = await loginUser(data);

    if (res) {
      dispatch(setUser(res));
      navigate("/");
    }
  };

  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="w-full max-w-4xl text-center flex flex-col items-center bg-white p-10 rounded-lg shadow-lg">
        <h1 className="lora-font text-6xl text-blue font-bold mt-10">
          Welcome to <span className="text-blue-500">School</span>Space!
        </h1>
        <h3 className="sedan-regular text-2xl mt-5 text-gray-700">
          Your School's Ultimate Management Solution.
        </h3>
        <h5 className="text-xl mt-7 sedan-regular text-gray-600">
          SchoolSpace revolutionizes school management using comprehensive tools
          for class organization, student administration, and data analysis.
        </h5>
        <h5 className="text-xl mt-3 sedan-regular text-gray-600">
          Say goodbye to paperwork and hello to streamlined processes that save
          time.
        </h5>

        <h6 className="text-xl mt-5 sedan-regular text-gray-600">
          Sign up for SchoolSpace now and experience the difference firsthand...
        </h6>

        <Link
          to="/sign-in"
          className="bg-blue-700 font-bold text-lg text-white rounded-lg p-4 uppercase hover:bg-blue-500 disabled:opacity-80 mt-5 w-2/6"
        >
          Sign In
        </Link>

        <div className="text-lg flex gap-2 mt-5 text-gray-700">
          <p>Don't have an account?</p>
          <Link
            to="/sign-up"
            className="text-red-500 underline hover:text-red-700"
          >
            Sign up
          </Link>
        </div>

        <button
          onClick={handleDemoTour}
          className="text-white rounded-lg p-4 text-md font-semibold bg-green-700 hover:bg-green-500 disabled:opacity-80 mt-8 w-2/6"
        >
          Click here for a demo tour
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
