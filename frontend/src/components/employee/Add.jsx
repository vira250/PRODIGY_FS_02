import React, { useEffect } from "react";
import fetchDepartments from "../../utils/EmployeeHelper";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Add = () =>{
  const navigate = useNavigate();
    const [departments , setDepartments] = useState([]);
    const [formData, setFormData] = useState({});
    useEffect(() =>{
        const getDepartments = async () =>{
         const departments = await fetchDepartments()
         setDepartments(departments);
        }
        getDepartments();
    }, [])

    const handleChange = (e) =>{
      const {name, value, files} = e.target;
      if(name=== "image"){
        setFormData((prevData) => ({...prevData, [name]: files[0]}))
      } else{
        setFormData((prevData) => ({...prevData, [name]: value}))
      }
    }
    
    const handleSubmit = async (e) =>{
      e.preventDefault();
      const formDataObj = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataObj.append(key, formData[key]);
      });
        try {
          const response = await axios.post(
          'http://localhost:5000/api/employees/add',
          formDataObj,
          {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    if (response.data.success) {
      navigate("/admin-dashboard/employees");
    } else {
      console.error("Failed to add employee:", response.data.error);
      alert(response.data.error || "Unknown error");
    }
        } catch (error){
          console.error("Axios error:", error);
          if (error.response && !error.response.data.success) {
            alert(error.response.data.error);
          } else {
              alert("Server error. Please try again.");
            }
        }

      }
    return(
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add New Employee</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Enter Name"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Enter Email"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Employee ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
          <input
            type="text"
            name="employeeId"
            onChange={handleChange}
            placeholder="Employee ID"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
          <input
            type="date"
            name="dob"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select
            name="gender"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Marital Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
          <select
            name="maritalStatus"
            onChange={handleChange}
            required
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
            onChange={handleChange}
            placeholder="Designation"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <select
            name="department"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
          >
            <option value="">Select Department</option>
                {departments.map((dep) =>(
                    <option key= {dep._id} value={dep._id}>{dep.dep_name}</option>
                ))}
          </select>
        </div>

        {/* Salary */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
          <input
            type="number"
            name="salary"
            onChange={handleChange}
            placeholder="Salary"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="••••••••"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select
            name="role"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />
        </div>
      

      <div className="md:col-span-2 mt-6 flex justify-center">
        <button
          type="submit"
           className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition duration-200"
        >
          Add Employee
        </button>
      </div>
    </form>
    </div>
    )
}

export default Add;