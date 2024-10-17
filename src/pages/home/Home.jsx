import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; // Import AuthContext
import { useParams, useNavigate } from "react-router-dom"; // Import navigation hooks

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isAuthenticated, id: userId, loading: authLoading } = useAuth(); // Auth state
  const { id: paramId } = useParams(); // ID from URL
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    const fetchPosts = async () => {
      if (authLoading) {
        console.log("Auth state still loading...");
        return; // Wait until auth state is ready
      }

      console.log("Authentication state:", isAuthenticated, "User ID:", userId, "Param ID:", paramId);

      // Handle authentication and ID matching
      if (!isAuthenticated || paramId !== userId) {
        console.log("User not authenticated or ID mismatch");
        setError("User not authenticated");
        navigate("/auth/login"); // make loading page sign
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5001/api/post/feed/${userId}`
        );
        console.log(response.data);
        setPosts(response.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Error fetching posts");
      } finally {
        setLoading(false); // Ensure loading stops
      }
    };

    fetchPosts();
  }, [isAuthenticated, userId, paramId, authLoading, navigate]);

  if (authLoading || loading) {
    return <div>Loading...</div>; // Wait for loading to finish
  }

  if (error) {
    return <div className="error">{error}</div>; // Display error message
  }

  return (
    <div className="feed">
      <h2>Your Feed</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h3>{post.text}</h3>
            <p>Posted by: {post.postedBy}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feed;
