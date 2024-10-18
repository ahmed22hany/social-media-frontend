import axios from "axios";

// Axios function to delete a reply
const deleteReply = async (postId, replyId) => {
    try {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    console.log(token);
    
    // Send a DELETE request with the token in the headers
    const response = await axios.delete(`http://localhost:5001/api/post/${postId}/reply/${replyId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`, // Attach token for authentication
            },
        });
    console.log("API Response:", response);
    if (response.status === 200) {
    console.log("Reply deleted successfully");
    return response.data;
    } else {
    console.error("Failed to delete reply");
    return null;
    }
    } catch (error) {
    console.error("Error deleting reply:", error);
    return null;
    }
};
export default deleteReply;