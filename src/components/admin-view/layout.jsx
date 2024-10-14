import { Outlet } from "react-router-dom"

 const ProfileLayout = () => {
  return (
    <div>
        {/* left side bar */}
        <div>
            <Outlet />
        </div>
    </div>
  )
}

export default ProfileLayout;
