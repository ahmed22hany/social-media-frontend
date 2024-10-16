import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

//  eslint-disable-next-line react/prop-types
const UserProfile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token"); // Replace with your token retrieval logic

      try {
        const response = await axios.get(
          `http://localhost:5001/api/auth/getUser/${userId}`,
          {
            headers: {
              token,
            },
          }
        );
        setUserData(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!userData) return <div>No user data found.</div>;

  const { user, posts, isAdmin } = userData;
  console.log(userData);

  return (
    <div>
      <h1>{user.username}&apos;s Profile</h1>
      <img
        src={user.profilePic || "defaultProfilePic.png"}
        alt={`${user.username}&apos;s profile`}
      />
      <p>Email: {user.email}</p>
      <p>Bio: {user.bio}</p>
      {isAdmin && <p>This user is an admin.</p>}
      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post._id}>
          <h3>{post.text}</h3>
          <p>Posted by: {post.postedBy.username}</p>
          <p>Replies:</p>
          <ul>
            {post.replies.map((reply) => (
              <li key={reply._id}>
                <strong>{reply.username || "Anonymous"}:</strong> {reply.text}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default UserProfile;
