import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../hooks/auth.hook";
import LoadingSpinner from "./LoadingSpinner";

const AuthLayout = ({ children }) => {
  const navigate = useNavigate();
  const { data: user, isFetching } = useCurrentUser();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (!isFetching && !authStatus) {
      navigate("/");
    }
  }, [isFetching, authStatus, navigate]);

  if (isFetching) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
};

export default AuthLayout;
