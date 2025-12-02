import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const View = () =>{
    const {id} = useParams();
    const [employee , setEmployee] = useState(null);

    useEffect(() =>{

    const fetchEmployee = async () =>{
        try{
            const response = await axios.get(`https://employee-api-nine.vercel.app/api/employees/${id}`,{
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(response.data)
            if(response.data.success){
                setEmployee(response.data.employee)
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
    return (
        <>
  {employee ? (
    <div className="max-w-5xl mx-auto mt-30 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Employee Details</h2>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            src={`https://employee-api-nine.vercel.app/${employee.userId.profileImage}`}
            className="w-48 h-48 rounded-full object-cover border-4 border-blue-500 shadow-md"
            alt="Profile"
          />
        </div>

        {/* Employee Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 text-gray-900 w-full text-lg">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-semibold">{employee.userId.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Employee ID</p>
            <p className="font-semibold">{employee.employeeId}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Date of Birth</p>
            <p className="font-semibold">{new Date(employee.dob).toLocaleDateString()}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Gender</p>
            <p className="font-semibold">{employee.gender}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Department</p>
            <p className="font-semibold">{employee.department.dep_name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Marital Status</p>
            <p className="font-semibold">{employee.maritalStatus}</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="text-center text-lg py-10 text-gray-500">Loading...</div>
  )}
</>

    )
}

export default View;