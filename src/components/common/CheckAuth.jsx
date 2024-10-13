// function that checks every possible auth route and returns the correct one
/* eslint-disable react/prop-types */
import { useLocation, Navigate } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, children }) => {
  const location = useLocation();

  // here we need to check if the user is authenticated
  // if not we need to redirect them to the login page
  // if they are authenticated we need to return them to signup page then we need to redirect them to login page

  if (!isAuthenticated) {
    // Redirect to register if the current path isn't register or login
    if (
      location.pathname !== "/auth" &&
      location.pathname !== "/auth/register" &&
      location.pathname !== "/auth/login"
    ) {
      return <Navigate to="/auth/register" />;
    }
  }

  // Authenticated users should be redirected away from auth pages
  if (isAuthenticated) {
    if (
      location.pathname.includes("/auth/login") ||
      location.pathname.includes("/auth/register")
    ) {
      return <Navigate to="/" />;
    }
  }

  return <div>{children}</div>;
};

export default CheckAuth;
