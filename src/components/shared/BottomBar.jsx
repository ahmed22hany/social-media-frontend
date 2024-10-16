import { NavLink } from "react-router-dom";

import { sidebarLinks } from "../../constants";

function BottomSidebar() {
  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((link) => {
          return (
            <NavLink
              to={link.route}
              key={link.label}
              className={({ isActive }) =>
                `bottombar_link ${isActive ? "bg-primary-500" : ""}`
              }
            >
              <img
                src={link.imgURL}
                alt={link.label}
                width={16}
                height={16}
                className="object-contain"
              />

              <p className="text-subtle-medium text-light-1 max-sm:hidden">
                {link.label.split(/\s+/)[0]}
              </p>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
}

export default BottomSidebar;
