
import axios from "axios"
const fetchDepartments = async () =>{
    let departments 
    try{
        const response = await axios.get('http://localhost:5000/api/department',{
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
        })
            if(response.data.success && Array.isArray(response.data.data)){
                departments = response.data.data
            }
    } catch (error) {
            console.log("Axios error:", error); 
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            } else {
                alert("Server error. Please try again.");
            }
        } 
        return departments
} 

export default fetchDepartments;

