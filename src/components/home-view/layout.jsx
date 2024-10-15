import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div>
      <div>Header</div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
