import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      {/* the ui for the auth layout should be above here */}
      <div>Hello That is the auth layout</div>

      {/* the routes of the auth layout should be below here */}
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;
