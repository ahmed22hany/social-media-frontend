import { useState } from "react";
import { loginUser } from "../api/auth";
import axios from "axios";

export const useAuthActions = () => {
  const [error, setError] = useState(null);

  const register = async ({ username, email, password }) => {
    try {
      const response = await axios.post("/api/auth/register", {
        username,
        email,
        password,
      });
      console.log(response.data);
      return response.data; // Return the response data
    } catch (error) {
      console.error("Error registering user:", error);
      throw error; // Throw error to handle it in the component
    }
  };

  const login = async ({ email, password }) => {
    try {
      const data = await loginUser({ email, password });
      if (data.success) {
        localStorage.setItem("token", data.token); // Store the token in local storage
        return data; // Return data for further actions if needed
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setError(err.message);
      return null; // Return null if there's an error
    }
  };

  return { login, error, register };
};
