import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="container">
      {/* the ui for the auth layout should be above here */}
      <div>Header</div>

      {/* the routes of the auth layout should be below here */}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
