
 import{ useEffect, useState } from "react";
 import axios from 'axios'; 
 import fetchAdminData from "@/api/fetchAdminData";

const AdminProfile=()=>{
    const[adminData,setAdminData]=useState({});
    const[adminPost,setAdminPost]=useState([]);
    const[loading, setLoading]=useState(true);
    const[isEditing, setIsEditing]=useState(null)
    const[editPostData, setEditPostData]=useState({title:'',content:''});

    const displayData = async()=>{
        try{
            const data = await fetchAdminData()
            setAdminData(data);
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
        setEditPostData({title:post.title, content:post.content});
    }
    const handleEditChange=(e)=>{
        setEditPostData({...editPostData, [e.target.name]: e.target.value});

    }
    const handleEditSubmit=async()=>{
        try{
            await axios.put('', {...editPostData, id: isEditing});
            setIsEditing(null);
            setAdminPost(adminPost.map(post=>post.id===isEditing? {...post,...editPostData}:post));
        }catch(error){
            console.error('Error editing post:', error);
        }
    }

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
            <li key={post._id}>
                {isEditing === post._id ? (
                // Display the edit form if the post is being edited
                <div>
                    <input
                    type="text"
                    name="title"
                    value={editPostData.title}
                    onChange={handleEditChange}
                    placeholder="Edit Title"
                    />
                    <textarea
                    name="content"
                    value={editPostData.content}
                    onChange={handleEditChange}
                    placeholder="Edit Content"
                    />
                    <button onClick={() => handleEditSubmit(post._id)}>Save</button>
                    <button onClick={() => setIsEditing(null)}>Cancel</button>
                </div>
                ) : (
                // Display the post normally if it's not being edited
                <div>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <button onClick={() => handleEditClick(post)}>Edit</button>
                    <button onClick={() => handleDeletePost(post._id)}>Delete</button>
                </div>
                )}
            </li>
            ))}
        </ul>
        </div>
    )
}

export default AdminProfile;