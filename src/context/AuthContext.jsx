/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { getAuthUser } from "../api/auth";

// Create the Auth Context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token"); // Assuming the token is stored in local storage

      if (token) {
        try {
          const data = await getAuthUser(token);
          setIsAuthenticated(data.ok); // Check if user is authenticated
        } catch (error) {
          console.error("Error checking authentication status:", error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false); // Stop loading
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth Context
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
