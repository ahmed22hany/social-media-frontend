import axios from "axios";

// Set base URL for your API (adjust if needed)
axios.defaults.baseURL = "http://localhost:5001";

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(
      "http://localhost:5001/api/auth/login",
      credentials
    );
    localStorage.setItem("token", response.data.token);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const registerUser = async (credentials) => {
  const response = await axios.post(
    "http://localhost:5001/api/auth/register",
    credentials
  );
  localStorage.setItem("token", response.data.token);
  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.post(
    "http://localhost:5001/api/auth/logout",
    null,
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );
  localStorage.removeItem("token");
  console.log("User logged out");
  return response.data;
};

export const getAuthUser = async (token) => {
  const response = await axios.get(
    "http://localhost:5001/api/auth/getAuthUser",
    {
      headers: {
        token,
      },
    }
  );
  return response.data;
};
