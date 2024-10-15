
    import{ useEffect, useState } from "react";
    import axios from 'axios'; 
    import fetchAdminData from "@/api/fetchAdminData";
    import { useAuth } from "../../context/AuthContext"

const AdminProfile=()=>{
    const[adminData,setAdminData]=useState({});
    const[adminPost,setAdminPost]=useState([]);
    const[loading, setLoading]=useState(true);
    const[isEditing, setIsEditing]=useState(null)
    const[editPostData, setEditPostData]=useState({text:''});
    const[addReply,setAddReply]=useState({text:""});
    const { isAuthenticated } = useAuth();
    const displayData = async()=>{
        try{
            const data = await fetchAdminData()
            setAdminData(data.user);
            setAdminPost(data.post);
            setLoading(false);
        }catch(error){
            console.error('Error fetching data:', error);
        }
    }
    useEffect(()=>{
        displayData();
    }, []);
    const handleDeletePost =async(postId)=>{
        try{
            await axios.delete('');
            setAdminPost(adminPost.filter(post=>post.id!==postId));
        }catch(error){
            console.error('Error deleting post:', error);
        }
    };
    
    const handleEditClick=(post)=>{
        setIsEditing(post.id);
        setEditPostData({ text:post.text});
    }
    const handleEditChange=(e)=>{
        setEditPostData({...editPostData, [e.target.name]: e.target.value});

    }
    const handleEditSubmit=async(post)=>{
        try{
            await axios.put(`http://localhost:5001/api/post/${post._id}`, {...editPostData, id: isEditing});
            console.log(post._id)
            setIsEditing(null);
            setAdminPost(adminPost.map(post=>post.id===isEditing? {...post,...editPostData}:post));
        }catch(error){
            console.error('Error editing post:', error);
        }
    }
    // const handleDeleteReply=async(post, replyId)=>{
    //     try{
    //         await axios.delete(`http://localhost:5001/api/post/reply/${post._id}/${replyId}`);
    //         setAdminPost(adminPost.map(post=>post._id === post._id? {...post, replies:post.replies.filter(reply=>reply._id!==replyId)}:post))
    //     }catch(error){
    //         console.error('Error deleting reply:', error);
    //     }
    // }

    const handleAddReply = async (post) => {
        // Check if the user is authenticated before attempting to add a reply
        if (!isAuthenticated) {
            console.error('User is not authenticated');
            return;
        }
        try {
            // Ensure the post object has a valid id
            console.log(post._id); // Inspect the post object to check for a valid ID
    
            if (!post._id) {
                console.error('Post ID is missing or undefined');
                return;
            }
    
            // Send POST request to add a reply to the post
            await axios.post(`http://localhost:5001/api/post/reply/${post._id}`, { ...addReply });
    
            // Reset the addReply state to clear the input field
            setAddReply({ text: "" });
    
            // Update the adminPost state with the newly added reply
            setAdminPost(adminPost.map(p => 
                p.id === post.id ? { ...p, replies: [...p.replies, { ...addReply }] } : p
            ));
        } catch (error) {
            console.error('Error adding reply:', error);
        }
    };
    

    // const handleAddReply=async(post)=>{
    //     try {
    //         await axios.post(`http://localhost:5001/api/post/reply/${post._id}`, {id:addReply});
    //         setAddReply({text:""});
    //         setAdminPost(adminPost.map(post=>post._id === addReply ? {...post, replies:[...post.replies,addReply]}:post))
    //     } catch (error) {
    //         console.error('Error adding reply:', error);
    //     }
    // }

    if(loading){
        return <div>Loading...</div>
    }


    return (
        <div className="admin-profile">
        <h1>{adminData.username} Profile</h1>
        <p>Email: {adminData.email}</p>
        <img src={adminData.profilePic} alt={adminData.username} /> {/* Replace with actual API endpoint */}
        <h2>Your Posts</h2>
        <ul>
            {adminPost.map((post) => (
                <li key={post.id}>
                {isEditing === post.id ? (
                    // Display the edit form if the post is being edited
                    <div>
                    <textarea
                    name="text"
                    value={editPostData.text}
                    onChange={handleEditChange}
                    placeholder="Edit Content"
                    />
                    <button onClick={() => handleEditSubmit(post)}>Save</button>
                    <button onClick={() => setIsEditing(null)}>Cancel</button>
                </div>
                ) : (
                    // Display the post normally if it's not being edited
                    <div>
                    <p>{post.text}</p>
                    <button onClick={() => handleEditClick(post)}>Edit</button>
                    <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                </div>
                )}
                
                {/* show replies*/}
                <h4>Replies</h4>
                <ul>
                    {post.replies.map((reply) => (
                    <li key={reply._id}>{reply.text}</li>
                    ))}
                </ul>
                {/*add reply*/}
                <input
                    type="text" value={addReply.text} 
                    onChange={(e) => setAddReply({...addReply, text: e.target.value })}
                    placeholder="Add a reply" />
                    <button onClick={() => handleAddReply(post)}>Submit</button>
            </li>
            ))}
        </ul>
        </div>
    )
}

export default AdminProfile;