import { useState, useEffect } from "react";
import ActivityCell from "../../components/shared/ActivityCell";
import fetchAdminData from "../../api/fetchAdminData";
import { useAuth } from "@/context/AuthContext";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";

const Activity = () => {
  const [notificationState, setNotificationState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated) {
        console.log("user not authenticated");
        //navigate to the login page
        return;
      }

      try {
        const userData = await fetchAdminData();
        setNotificationState(userData.user.notifications);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  return (
    <div className="flex flex-col gap-y-4 md:items-center md:justify-center p-4">
      <h1 className="font-black text-2xl">Activity</h1>
      {isLoading ? (
        <LoadingSkeleton />
      ) : notificationState.length === 0 ? (
        <p className="text-white">There is no Activities yet.</p>
      ) : (
        notificationState.map((notification) => (
          <ActivityCell
            key={notification._id}
            cellImage={notification.userProfilePIC}
            activityText={notification.message}
            userName={notification.username}
            postID={notification.postId}
          />
        ))
      )}
    </div>
  );
};

export default Activity;
