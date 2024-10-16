import { Link } from "react-router-dom";

function Topbar() {
  return (
    <nav className="topbar">
      <Link to="/home" className="flex items-center gap-4">
        <img src="/assets/logo.svg" alt="logo" width={28} height={28} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">
          TrendWave
        </p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <div className="flex cursor-pointer">
            <img src="/assets/logout.svg" alt="logout" width={24} height={24} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
