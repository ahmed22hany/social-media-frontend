import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "@/api/auth";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = await registerUser({ username, email, password });
    if (userData) {
      navigate("/auth/login");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="absolute inset-0 blur-lg bg-gradient-to-r from-blue to-purple-500 opacity-50"></div>
      <div className="bg-dark-1 shadow-md rounded-lg p-16 max-w-md w-full relative z-10">
        <div className="text-center mb-6">
          <img
            src="/assets/logo.svg"
            alt="logo"
            className="mx-auto w-16 h-16"
          />
          <h2 className="text-2xl font-bold text-light-1">
            Welcome to TrendWave
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-light-1"
              htmlFor="username"
            >
              Username
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-2 rounded-lg border text-black border-gray-300"
              />
            </label>
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-light-1"
              htmlFor="email"
            >
              Email
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg border text-black border-gray-300"
              />
            </label>
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-light-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg border text-black border-gray-300"
            />
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r 
              from-blue-500 to-purple-500 text-white font-bold rounded-lg 
              hover:bg-white hover:text-black transition-all duration-300"
            >
              Signup
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-light-1">
              Already have an account?
              <Link to="/auth/login" className="hover:underline font-bold">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
