import { useEffect, useState } from "react";
import axios from "axios";
import fetchAdminData from "@/api/fetchAdminData";
import { useAuth } from "../../context/AuthContext";

const AdminProfile = () => {
  const [adminData, setAdminData] = useState({});
  const [adminPost, setAdminPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(null);
  const [editPostData, setEditPostData] = useState({ text: "" });
  const [addReply, setAddReply] = useState({ text: "" });
  const { isAuthenticated } = useAuth();
  const displayData = async () => {
    try {
      const data = await fetchAdminData();
      setAdminData(data.user);
      setAdminPost(data.post);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    displayData();
  }, []);
  const handleDeletePost = async (postId) => {
    try {
      await axios.delete("");
      setAdminPost(adminPost.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEditClick = (post) => {
    setIsEditing(post.id);
    setEditPostData({ text: post.text });
  };
  const handleEditChange = (e) => {
    setEditPostData({ ...editPostData, [e.target.name]: e.target.value });
  };
  const handleEditSubmit = async (post) => {
    try {
      await axios.put(`http://localhost:5001/api/post/${post._id}`, {
        ...editPostData,
        id: isEditing,
      });
      console.log(post._id);
      setIsEditing(null);
      setAdminPost(
        adminPost.map((post) =>
          post.id === isEditing ? { ...post, ...editPostData } : post
        )
      );
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };
  // const handleDeleteReply=async(post, replyId)=>{
  //     try{
  //         await axios.delete(`http://localhost:5001/api/post/reply/${post._id}/${replyId}`);
  //         setAdminPost(adminPost.map(post=>post._id === post._id? {...post, replies:post.replies.filter(reply=>reply._id!==replyId)}:post))
  //     }catch(error){
  //         console.error('Error deleting reply:', error);
  //     }
  // }

  const handleAddReply = async (post, replyText, user) => {
    if (!isAuthenticated) {
      console.error("User is not authenticated");
      return;
    }

    try {
      // Construct the reply data object
      const replyData = {
        userId: user._id, // User ID of the person replying
        username: user.username, // Username of the person replying
        userProfilePIC: user.profilePic, // User's profile picture
        text: replyText, // Reply text content
      };

      // Make sure to await the axios.post call to get the response data
      const { data } = await axios.post(
        `http://localhost:5001/api/post/reply/${post._id}`,
        replyData
      );

      // Ensure the data contains the new reply and update state
      if (data && data.reply) {
        setAdminPost(
          adminPost.map((p) =>
            p._id === post._id
              ? { ...p, replies: [...p.replies, data.reply] }
              : p
          )
        );
        setAddReply({ text: "" });
      } else {
        console.error("Error: Reply data is missing in the response");
      }
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }



  return (
    <div className="admin-profile max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">{adminData.username} Profile</h1>
      <p className="text-lg text-center mb-4">Email: {adminData.email}</p>
      <div className="flex justify-center mb-6">
        <img
          src={adminData.profilePic}
          alt={adminData.username}
          className="rounded-full w-24 h-24 object-cover"
        />
      </div>

      <h2 className="text-2xl font-semibold mb-4">Your Posts</h2>
      <ul className="space-y-6">
        {adminPost.map((post) => (
          <li key={post._id} className="bg-dark-2 shadow rounded-lg p-4 relative mb-10">
            {isEditing === post._id ? (
              <div>
                <textarea
                  name="text"
                  value={editPostData.text}
                  onChange={handleEditChange}
                  placeholder="Edit Content"
                  className="w-full p-2 border rounded"
                />
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    onClick={() => handleEditSubmit(post)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(null)}
                    className="bg-blue px-3 py-1 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-lg">{post.text}</p>
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={() => handleEditClick(post)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePost(post._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}

            {/* Replies */}
            <div className="mt-6 border-t border-gray-300 pt-4">
              <h4 className="font-semibold">Replies</h4>
              <ul className="space-y-2 mt-2">
                {post.replies.map((reply) => (
                  <li key={reply._id} className="bg-dark-2 p-2 rounded-lg border border-gray-200">
                    <p >{reply.text}</p>
                    <div className="absolute top-2 right-2 flex space-x-2">
                    </div>
                  </li>
                ))}
              </ul>

              {/* Add Reply */}
              <div className="mt-4">
                <input
                  type="text"
                  value={addReply.text}
                  onChange={(e) => setAddReply({ ...addReply, text: e.target.value })}
                  placeholder="Add a reply"
                  className="w-full text-dark-2 p-2 border rounded"
                />
                <button
                  onClick={() => handleAddReply(post, addReply.text, adminData)}
                  className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Submit
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

//   return (
//     <div className="admin-profile">
//       <h1>{adminData.username} Profile</h1>
//       <p>Email: {adminData.email}</p>
//       <img src={adminData.profilePic} alt={adminData.username} />{" "}
//       {/* Replace with actual API endpoint */}
//       <h2>Your Posts</h2>
//       <ul>
//         {adminPost.map((post) => (
//           <li key={post.id}>
//             {isEditing === post.id ? (
//               // Display the edit form if the post is being edited
//               <div>
//                 <textarea
//                   name="text"
//                   value={editPostData.text}
//                   onChange={handleEditChange}
//                   placeholder="Edit Content"
//                 />
//                 <button onClick={() => handleEditSubmit(post)}>Save</button>
//                 <button onClick={() => setIsEditing(null)}>Cancel</button>
//               </div>
//             ) : (
//               // Display the post normally if it's not being edited
//               <div>
//                 <p>{post.text}</p>
//                 <button onClick={() => handleEditClick(post)}>Edit</button>
//                 <button onClick={() => handleDeletePost(post.id)}>
//                   Delete
//                 </button>
//               </div>
//             )}

//             {/* show replies*/}
//             <h4>Replies</h4>
//             <ul>
//               {post.replies.map((reply) => (
//                 <li key={reply._id}>{reply.text}</li>
//               ))}
//             </ul>
//             {/*add reply*/}
//             <input
//               type="text"
//               value={addReply.text}
//               onChange={(e) =>
//                 setAddReply({ ...addReply, text: e.target.value })
//               }
//               placeholder="Add a reply"
//             />

//             <button
//               onClick={() => {
//                 handleAddReply(post, addReply.text, adminData);
//               }}
//             >
//               Submit
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

export default AdminProfile;
