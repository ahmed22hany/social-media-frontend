import axios from "axios";

     const fetchAdminData=async()=>{
        const token=localStorage.getItem("token")
        console.log(token)
        try{
            const AdminResponse= await axios.get('http://localhost:5001/api/auth/getAuthUser', {
                headers: {
                    token,
                },
                });
            console.log(AdminResponse.data);
            return AdminResponse.data
    
        }catch(error){
            console.error('Error fetching admin data:', error);
        }
    }
    export default fetchAdminData;

