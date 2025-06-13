import React, { useEffect } from "react";
import fetchDepartments from "../../utils/EmployeeHelper";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Edit = () =>{
    const {id} = useParams();
    const Navigate = useNavigate();
    const [employee , setEmployee] = useState({
        name: "",
        maritalStatus: "",
        designation : "",
        salary : 0,
        department : "",
    });
    const [departments , setDepartments] = useState(null);
    useEffect(() =>{
        const getDepartments = async () =>{
         const departments = await fetchDepartments()
         setDepartments(departments);
        }
        getDepartments();
        const fetchEmployee = async () =>{
        try{
            const response = await axios.get(`http://localhost:5000/api/employees/${id}`,{
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success){
                const employee = response.data.employee
                setEmployee((prev) => ({
                    ...prev, 
                    name:employee.userId.name, 
                    maritalStatus: employee.maritalStatus,
                    designation : employee.designation ,
                    salary : employee.salary ,
                    department : employee.department
                }))
            }
        } catch (error) {
            console.log("Axios error:", error); 
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            } else {
                alert("Server error. Please try again.");
            }
        }
    }
        fetchEmployee();
    }, [])

    const handleChange = (e) =>{
      const {name, value, files} = e.target;
        setEmployee({...employee, [name]: value})
    }
    

const handleSubmit = async (e) =>{
        e.preventDefault();
          try {
    const response = await axios.put(`http://localhost:5000/api/employees/${id}`,
      employee,
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    console.log("Response from server:", response.data);

    if (response.data.success) {
      Navigate("/admin-dashboard/employees");
    } else {
      console.error("Failed to edit employee:", response.data.error);
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
        <>{departments && employee ? (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Edit Employee Details</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            placeholder="Enter Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Marital Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
          <select
            name="maritalStatus"
            value={employee.maritalStatus}
            onChange={handleChange}
            // required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>
        </div>

        {/* Designation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
          <input
            type="text"
            name="designation"
            value={employee.designation}
            onChange={handleChange}
            placeholder="Designation"
            // required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Salary */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
          <input
            type="number"
            name="salary"
            onChange={handleChange}
            value={employee.salary}
            placeholder="Salary"
            // required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        {/* Department */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <select
            name="department"
            onChange={handleChange}
            value={employee.department}
            // required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
          >
            <option value="">Select Department</option>
                {departments.map((dep) =>(
                    <option key= {dep._id} value={dep._id}>{dep.dep_name}</option>
                ))}
          </select>
        </div>
      
      <div className="md:col-span-2 mt-6 flex justify-center">
        <button
          type="submit"
           className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition duration-200">
          Edit Employee
        </button>
      </div>
    </form>
    </div>
    ) : <div>Loading</div>}</>
    ) 
}

export default Edit;