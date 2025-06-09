import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const EditDepartment = () =>{
    const {id} = useParams();
    const [department, setDepartment] = useState([]);
    const [depLoading, setDeploading] = useState(false)
    const Navigate = useNavigate()
useEffect(() =>{
    const fetchDepartments = async () =>{
        setDeploading(true)
        try{
            const response = await axios.get(`http://localhost:5000/api/department/${id}`,{
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success && response.data.department){
                setDepartment(response.data.department)
            }
        } catch (error) {
            console.log("Axios error:", error); 
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            } else {
                alert("Server error. Please try again.");
            }
        } finally {
            setDeploading(false)
        }
    }
    fetchDepartments();
}, [])

const handleChange = (e) =>{
        const {name, value} = e.target;
        setDepartment({...department, [name] : value})

    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
          try {
    const response = await axios.put(
      `http://localhost:5000/api/department/${id}`,
      department,
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    console.log("Response from server:", response.data);

    if (response.data.success) {
      Navigate("/admin-dashboard/departments");
    } else {
      console.error("Failed to edit department:", response.data.error);
      alert(response.data.error || "Unknown error");
    }
  } catch (error) {
    console.error("Axios error:", error);
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    } else {
      alert("Server error. Please try again.");
    }
  }

    }
    return(
        <>{depLoading ? <div>Loading....</div>: 
            <div className="pt-10 px-4">
      <div className="bg-white rounded-xl shadow-md max-w-xl mx-auto p-6">

        <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Edit Department</h3>

        <form className="space-y-5" onSubmit={handleSubmit}>

          <div>
            <label htmlFor="dep_name" className="block text-sm font-semibold text-gray-700 mb-1">
              Department Name
            </label>
            <input
              type="text"
              name="dep_name"
              onChange={handleChange}
              value={department.dep_name}
              placeholder="Enter Department Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>


          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              onChange={handleChange}
              value={department.description}
              placeholder="Enter department description"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>


          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition"
            >
              Edit Department
            </button>
          </div>
        </form>
      </div>
    </div>
}</>
    )
}

export default EditDepartment;