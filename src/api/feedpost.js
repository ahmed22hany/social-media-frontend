import  { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; // Assuming you have an AuthContext to get the user ID

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth(); // Now we have currentUser from context

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (!currentUser || !currentUser._id) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:5001/api/post/feed/${currentUser._id}`
        );
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Error fetching posts");
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentUser]); // Re-fetch posts when currentUser changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="feed">
      <h2>Your Feed</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>Posted by: {post.postedBy}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feed;