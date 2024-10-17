import { Route, Routes, Navigate } from "react-router-dom";
import CheckAuth from "./components/common/CheckAuth";
import AuthLayout from "./components/auth/layout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Activity from "./pages/activity/activity";
// Import the provider
import HomeLayout from "./components/home-view/layout";
import Home from "./pages/home/Home";
import ProfileLayout from "./components/admin-view/layout";
import AdminProfile from "./pages/profile/AdminProfile";
import NotFound from "./pages/not-found";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth>
              <AuthLayout />
            </CheckAuth>
          }>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="" element={<Navigate to="/auth/login" />} />
        </Route>
        <Route
          path="/"
          element={
            <CheckAuth>
              <HomeLayout />
            </CheckAuth>
          }>
          <Route path="home" element={<Home />} />
        </Route>

        <Route
          path="/profile"
          element={
            <CheckAuth>
              <ProfileLayout />
            </CheckAuth>
          }>
          <Route path="admin" element={<AdminProfile />} />
        </Route>

        <Route path="/activity" element={<Activity />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
