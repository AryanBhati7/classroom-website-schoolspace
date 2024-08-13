import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Outlet } from "react-router-dom";
import { useCurrentUser } from "./hooks/auth.hook";
import { setUser } from "./features/authSlice";
import { useDispatch } from "react-redux";
import { LoadingSpinner } from "./components";

function App() {
  const dispatch = useDispatch();
  const { data: userData, isFetching, error, isFetched } = useCurrentUser();

  useEffect(() => {
    if (isFetched) {
      dispatch(setUser(userData));
    }
  }, [userData]);

  if (isFetching) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
