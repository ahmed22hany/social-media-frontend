import "./App.css";
import { Route, Routes } from "react-router-dom";
import CheckAuth from "./components/common/CheckAuth";
import AuthLayout from "./components/auth/layout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Home from "./pages/home/Home";
import HomeLayout from "./components/home-view/layout";

function App() {
  // this must be a real auth check and get it from the backend we have created
  // also we need to get the user if they are logged in
  // we need to have it with both ways in redux store or local storage

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

      <Route
        path="/"
        element={
          <CheckAuth isAuthenticated={isAuthenticated}>
            <HomeLayout />
          </CheckAuth>
        }
      >
        <Route path="home" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
