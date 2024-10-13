import axios from "axios";

// Set base URL for your API (adjust if needed)
axios.defaults.baseURL = "http://localhost:5001";

export const loginUser = async (credentials) => {
  const response = await axios.post(
    "http://localhost:5001/api/auth/login",
    credentials
  );
  console.log(response.data);
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
