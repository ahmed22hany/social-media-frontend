import { logoutUser } from "@/api/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

function Topbar() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    if (isAuthenticated) {
      await logoutUser();
      navigate("/auth/login");
    }
  };
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
          <button className="flex cursor-pointer" onClick={handleLogout}>
            <img src="/assets/logout.svg" alt="logout" width={24} height={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
