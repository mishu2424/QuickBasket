import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  if (loading) return <span>Loading...</span>;
  if (user) return children;
  return (
    <Navigate to={`/login`} state={location.pathname} replace={true}></Navigate>
  );
};

export default PrivateRoute;
