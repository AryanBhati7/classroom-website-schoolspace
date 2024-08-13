import React from "react";
import { LandingPage } from "../components/index.js";
import { useSelector } from "react-redux";

function Home() {
  const authStatus = useSelector((state) => state.auth.status);
  console.log(authStatus);

  const user = useSelector((state) => state.auth.user);

  console.log(user);

  if (!authStatus) {
    return <LandingPage />;
  }

  return <div>Home Page</div>;
}

export default Home;
