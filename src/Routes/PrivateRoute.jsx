import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  console.log(location);
  const { user, loading } = useAuth();
  if (loading) return <span>Loading...</span>;
  if (user) return children;
  return (
    <Navigate to={`/login`} state={location?.pathname && location.pathname}></Navigate>
  );
};

export default PrivateRoute;
