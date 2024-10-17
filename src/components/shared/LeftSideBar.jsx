import { useNavigate } from "react-router-dom";

import { NavLink } from "react-router-dom";
import { sidebarLinks } from "../../constants";
import { useAuth } from "@/context/AuthContext";
import { logoutUser } from "@/api/auth";

const LeftSidebar = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    if (isAuthenticated) {
      await logoutUser();
      navigate("/auth/login");
    }
  };

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks?.map((link) => {
          if (link.route === undefined || link.route === null) {
            return (
              <NavLink
                to={link.route}
                className="leftsidebar_link"
                key={link.label}
              >
                <img
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                />
                <p className="text-light-1 max-lg:hidden">{link.label}</p>
              </NavLink>
            );
          } else {
            return (
              <NavLink
                to={link.route}
                key={link.label}
                className={({ isActive }) =>
                  `leftsidebar_link ${isActive ? "bg-primary-500" : ""}`
                }
              >
                <img
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                />
                <p className="text-light-1 max-lg:hidden">{link.label}</p>
              </NavLink>
            );
          }
        })}
      </div>

      <div className="mt-10 px-6">
        <div className="flex cursor-pointer gap-4 p-4" onClick={handleLogout}>
          <img src="/assets/logout.svg" alt="logout" width={24} height={24} />
          <p className="text-light-2 max-lg:hidden">Logout</p>
        </div>
      </div>
    </section>
  );
};

export default LeftSidebar;
