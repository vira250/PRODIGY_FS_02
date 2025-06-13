
import axios from "axios"
import { useNavigate } from "react-router-dom"

 export const columns =[
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "150px",
        center: true,
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "160px",
        center: true,
    },
    {
        name: "Image",
        selector: (row) => row.profileImage,
        width: "160px",
        center: true,
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        width: "160px",
        center: true,
    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        sortable: true,
        width: "160px",
        center: true,
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: true,
    }
]
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

 export const EmployeeButtons = ({Id}) => {
  const navigate = useNavigate();

    return(
        <div className="flex space-x-3">
  <button
    className="px-4 py-1.5 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-700 transition"
    type="button"
    onClick={() =>navigate(`/admin-dashboard/employees/${Id}`)}
  >
    View
  </button>
  <button
    className="px-4 py-1.5 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition"
    type="button"
    onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}>
  
    Edit
  </button>
    <button
    className="px-4 py-1.5 bg-yellow-600 text-white rounded-md font-medium hover:bg-red-700 transition"
    type="button"
  >
    Salary
  </button>

    <button
    className="px-4 py-1.5 bg-green-600 text-white rounded-md font-medium hover:bg-red-700 transition"
    type="button"
  >
    Leave
  </button>
</div>

    )
}
export default fetchDepartments;

