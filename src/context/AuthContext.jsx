import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the AuthContext
export const AuthContext = createContext();

// Create a provider component
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  // Check authentication status from the backend
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      console.log("Token being sent:", token); // Log the token
      try {
        const response = await axios.get(
          "http://localhost:5001/api/auth/getAuthUser",
          {
            headers: {
              token: localStorage.getItem("token"), // Assuming you're storing the token in local storage
            },
          }
        );

        console.log("Full Response:", response);
        console.log("Response Data:", response.data);

        if (response.data.ok) {
          setIsAuthenticated(response.data.isAuthenticated);
          console.log("Is Authenticated:", response.data.isAuthenticated);
        } else {
          setIsAuthenticated(false); // Set to false if not authenticated
        }
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  if (loading) {
    return <div>Loading...</div>; // Optional: Show a loading state while checking
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
