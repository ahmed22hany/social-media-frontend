import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="container">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
