import { Route, Routes } from "react-router-dom";
import CheckAuth from "./components/common/CheckAuth";
import AuthLayout from "./components/auth/layout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
// Import the provider
import HomeLayout from "./components/home-view/layout";
import Home from "./pages/home/Home";

function App() {
  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <CheckAuth>
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
          <CheckAuth>
            <HomeLayout />
          </CheckAuth>
        }
      />
      <Route path="home" element={<Home />} />
    </Routes>
  );
}

export default App;
