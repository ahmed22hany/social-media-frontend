import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    if (!email || !password) {
      toast({
        title: "Login failed",
        description: "Please check your email and password",
      });
    }
    toast({
      title: "Login successful",
      description: "You have been logged in",
    });
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-200 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <img
            src="/assets/logo.svg"
            alt="logo"
            className="mx-auto w-16 h-16"
          />
          <h2 className="text-2xl font-bold text-gray-700">
            Welcome to TrendWave
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600"
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
              className="block text-sm font-medium text-gray-600"
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
              from-blue-500 to-purple-500 text-black font-bold rounded-lg 
              hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
            >
              Login
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              First time here?
              <a
                href="/auth/register"
                className="text-blue-500 hover:underline"
              >
                Signup
              </a>
            </p>
          </div>
        </form>

        <div className="mt-6 flex justify-center gap-4">
          <button className="bg-gray-100 p-2 rounded-full shadow hover:bg-gray-200">
            <img
              src="/assets/google-icon.svg"
              alt="Google"
              className="w-6 h-6"
            />
          </button>
          <button className="bg-gray-100 p-2 rounded-full shadow hover:bg-gray-200">
            <img
              src="/assets/facebook-icon.svg"
              alt="Facebook"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

{
  /* <form

      className="flex flex-col items-center justify-center gap-4 bg-red-500 p-10"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="input input-bordered w-full max-w-xs text-black"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="input input-bordered w-full max-w-xs text-black"
      />
      <button type="submit" className="btn bg-black text-white w-full">
        Login
      </button>
    </form> */
}
