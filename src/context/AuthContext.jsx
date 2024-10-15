/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { getAuthUser } from "../api/auth";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const data = await getAuthUser(token);
          setIsAuthenticated(data.ok);
          navigate("/home");
        } catch (error) {
          console.error("Error checking authentication status:", error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  // Add the login function
  const login = async (email, password) => {
    try {
      const credentials = { email, password };
      const response = await loginUser(credentials);

      if (response && response.token) {
        setIsAuthenticated(true);
      } else {
        console.error(
          "Login failed:",
          response ? response.message : "No response"
        );
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use Auth context
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
