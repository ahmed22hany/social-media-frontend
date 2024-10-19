// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../../context/AuthContext"; // Import AuthContext
// import { useParams, useNavigate } from "react-router-dom"; // Import navigation hooks

// const Feed = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const { isAuthenticated, id: userId, loading: authLoading } = useAuth(); // Auth state
//   const { id: paramId } = useParams(); // ID from URL
//   const navigate = useNavigate(); // Navigation hook

//   useEffect(() => {
//     const fetchPosts = async () => {
//       if (authLoading) {
//         console.log("Auth state still loading...");
//         return; // Wait until auth state is ready
//       }

//       console.log("Authentication state:", isAuthenticated, "User ID:", userId, "Param ID:", paramId);

//       // Handle authentication and ID matching
//       if (!isAuthenticated || paramId !== userId) {
//         console.log("User not authenticated or ID mismatch");
//         setError("User not authenticated");
//         navigate("/auth/login"); // make loading page sign
//         return;
//       }

//       try {
//         const response = await axios.get(
//           `http://localhost:5001/api/post/feed/${userId}`
//         );
//         console.log(response.data);
//         setPosts(response.data);
//       } catch (err) {
//         console.error("Error fetching posts:", err);
//         setError("Error fetching posts");
//       } finally {
//         setLoading(false); // Ensure loading stops
//       }
//     };

//     fetchPosts();
//   }, [isAuthenticated, userId, paramId, authLoading, navigate]);

//   if (authLoading || loading) {
//     return <div>Loading...</div>; // Wait for loading to finish
//   }

//   if (error) {
//     return <div className="error">{error}</div>; // Display error message
//   }

//   return (
//     <div className="feed">
//       <h2>Your Feed</h2>
//       <ul>
//         {posts.map((post) => (
//           <li key={post._id}>
//             <h3>{post.text}</h3>
//             <p>Posted by: {post.postedBy}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Feed;


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

      console.log(
        "Authentication state:",
        isAuthenticated,
        "User ID:",
        userId,
        "Param ID:",
        paramId
      );

      // Handle authentication and ID matching
      if (!isAuthenticated || paramId !== userId) {
        console.log("User not authenticated or ID mismatch");
        setError("User not authenticated");
        navigate("/auth/login"); // Redirect to login
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

    // const likepost = async (postId, liked) => {
    //   try {
    //     await axios.post(`http://localhost:5001/api/post/${postId}/like`, {
    //       liked,
    //     });
    //     // Optionally update local state or refetch posts
    //   } catch (error) {
    //     console.error("Error liking post:", error);
    //     // Optionally handle the error (e.g., show a notification)
    //   }
    // };

    fetchPosts();
  }, [isAuthenticated, userId, paramId, authLoading, navigate]);

  if (authLoading || loading) {
    return <div>Loading...</div>; // Wait for loading to finish
  }

  if (error) {
    return <div className="error">{error}</div>; // Display error message
  }

  // return (
  //   <div className="feed">
  //     <h2>Your Feed</h2>
  //     <ul>
  //       {posts.map((post) => (
  //         <li key={post._id}>
  //           <h3>{post.postedBy.name}</h3>
  //           <p>{post.text}</p>
  //           <p>Likes: {post.likes.length}</p>
  //           <img src={post.postedBy.profileImage} alt={`${post.postedBy.name}'s profile`} />

  //           {/* Display Replies */}
  //           <div className="mt-4">
  //             <h4 className="font-semibold">Replies</h4>
  //             <ul className="space-y-2 mt-2 rounded-lg border border-gray-200">
  //               {post.replies.length > 0 ? (
  //                 post.replies.map((reply) => (
  //                   <li key={reply._id} className="bg-dark-4 p-2">
  //                     <p>{reply.text}</p>
  //                   </li>
  //                 ))
  //               ) : (
  //                 <li>No replies yet.</li>
  //               )}
  //             </ul>
  //           </div>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
  return (
    <div className="feed max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Your Feed</h2>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post._id} className="bg-dark-2 text-white shadow rounded-lg p-4 relative">

          <li
            key={post._id}
            className="bg-dark-2  text-white shadow rounded-lg p-4 relative"
          >

            <div className="flex justify-between">
              <div>
                <h3 className="text-xl font-bold">{post.postedBy.name}</h3>
                <p className="text-lg mt-2">{post.text}</p>

                <p className="text-sm text-gray-500">Likes: {post.likes.length}</p>
              </div>
              <div className="flex flex-col items-end">
                <img
                  src={post.postedBy.profileImage}
                  alt={`${post.postedBy.name}'s profile`}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
            </div>


                <p className="text-sm text-white">Likes: {post.likes.length}</p>
              </div>
              
              
              <h3 className="user-name">userName</h3>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "12px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  direction: "rtl",
                  width: "fit-content",
                  transition: "transform 0.2s ease-in-out",
                }}
                className="user-photo-container"
              >
                
                <img
                  src="https://placehold.co/600x400@3x.png"
                  alt="user photo"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #4A90E2",
                    transition: "box-shadow 0.3s ease-in-out",
                  }}
                  className="user-photo"
                />
              </div>
              
            </div>

            {/* Replies */}
            <div className="mt-4">
              <h4 className="font-semibold">Replies</h4>
              <ul className="space-y-2 mt-2 rounded-lg border border-gray-200 p-2">
                {post.replies.length > 0 ? (
                  post.replies.map((reply) => (

                    <li key={reply._id} className="bg-dark-4 text-white p-2 rounded-lg">
                    <li
                      key={reply._id}
                      className="bg-dark-4 p-2 rounded-lg text-white"
                    >

                      <p>{reply.text}</p>
                    </li>
                  ))
                ) : (
                  <li>No replies yet.</li>
                )}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feed;
