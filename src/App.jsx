import "./App.css";
import { Route, Routes } from "react-router-dom";
import CheckAuth from "./components/common/CheckAuth";
import AuthLayout from "./components/auth/layout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

function App() {
  // this must be a real auth check and get it from the backend we have created
  const isAuthenticated = true;

  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <CheckAuth isAuthenticated={isAuthenticated}>
            <AuthLayout />
          </CheckAuth>
        }
      >
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
