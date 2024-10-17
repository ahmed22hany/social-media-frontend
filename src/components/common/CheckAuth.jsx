import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
const CheckAuth = ({ children }) => {
  const { isAuthenticated, loading, setId, id } = useAuth();
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
      if (
        (isAuthenticated && location.pathname.includes("/auth/login")) ||
        location.pathname.includes("/auth/register")
      ) {
        const token = localStorage.getItem("token");
        if (token) {
          navigate(`/home/${id}`);
        }
      }

      if (isAuthenticated && location.pathname.includes("/profile")) {
        const token = localStorage.getItem("token");
        if (token) {
          navigate("/profile/admin");
        }
      }
    }
  }, [isAuthenticated, loading, location.pathname, navigate, setId, id]);

  return <div>{children}</div>;
};

export default CheckAuth;
