import { useNavigate } from "react-router-dom"
import axios from "axios"
 export const columns =[
    {
        name: "S No",
        selector: (row) => row.sno
    },
    {
        name: "Department Name",
        selector: (row) => row.name,
        sortable: true
    },
    {
        name: "Action",
        selector: (row) => row.action
    }
]

 export const DepartmentButtons = ({ DepId, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this department?");
    if (!confirm) return;

    try {
      const response = await axios.delete(`http://localhost:5000/api/department/${DepId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        onDepartmentDelete(DepId);
        alert("Department deleted successfully");
      } else {
        alert("Failed to delete department.");
      }
    } catch (error) {
      console.log("Axios error:", error);
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        alert("Server error. Please try again.");
      }
    }
  };
    return(
        <div className="flex space-x-3">
  <button
    className="px-4 py-1.5 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-700 transition"
    type="button"
    onClick={() =>navigate(`/admin-dashboard/department/${DepId}`)}
  >
    Edit
  </button>
  <button
    className="px-4 py-1.5 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition"
    type="button"
    onClick={handleDelete}
  >
    Delete
  </button>
</div>

    )
}