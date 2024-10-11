// function that checks every possible auth route and returns the correct one
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // here we need to check if the user is authenticated
  // if not we need to redirect them to the login page
  // if they are authenticated we need to return them to signup page then we need to redirect them to login page

  useEffect(() => {
    if (
      (!isAuthenticated && !location.pathname.includes("/login")) ||
      !location.pathname.includes("/register")
    ) {
      return navigate("/auth/register");
    }

    if (
      isAuthenticated &&
      (location.pathname.includes("/login") ||
        location.pathname.includes("register"))
    ) {
      return navigate("/auth/login");
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return <div>{children}</div>;
};

export default CheckAuth;
