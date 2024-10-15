import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
const CheckAuth = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return; // Don't do anything while loading

    if (!isAuthenticated) {
      // Redirect unauthenticated users to login or register
      if (
        location.pathname !== "/auth/register" &&
        location.pathname !== "/auth/login"
      ) {
        navigate("/auth/login");
      }
    } else {
      // Redirect authenticated users to home if they're on login or register pages
      if (
        location.pathname.includes("/auth/login") ||
        location.pathname.includes("/auth/register")
      ) {
        navigate("/home");
      }
    }
  }, [isAuthenticated, loading, location.pathname, navigate]);

  return <div>{children}</div>; // Render the children if no navigation is triggered
};

export default CheckAuth;
