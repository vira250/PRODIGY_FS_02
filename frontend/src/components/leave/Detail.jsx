import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
const Detail = () =>{
    const {id} = useParams();
    const [leave , setLeave] = useState(null);
    const navigate = useNavigate();
    useEffect(() =>{

    const fetchLeave = async () =>{
        try{
            const response = await axios.get(`https://employee-api-nine.vercel.app/api/leave/detail/${id}`,{
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(response.data)
            if(response.data.success){
                setLeave(response.data.leave)
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
    fetchLeave();
}, [])

    const changeStatus = async (id, newstatus) =>{
        try{
            const response = await axios.put(`https://employee-api-nine.vercel.app/api/leave/${id}`, {status: newstatus},{
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(response.data)
            if(response.data.success){
                navigate('/admin-dashboard/leaves')
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
    return (
        <>
  {leave ? (
    <div className="max-w-5xl mx-auto mt-30 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Leave Details</h2>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            src={`https://employee-api-nine.vercel.app/${leave.employeeId.userId.profileImage}`}
            className="w-48 h-48 rounded-full object-cover border-4 border-blue-500 shadow-md"
            alt="Profile"
          />
        </div>

        {/* Employee Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 text-gray-900 w-full text-lg">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-semibold">{leave.employeeId.userId.name}</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-500">Employee ID</p>
            <p className="font-semibold">{leave.employeeId.employeeId}</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-500">leave Type</p>
            <p className="font-semibold">{leave.leaveType}</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-500">Reason</p>
            <p className="font-semibold">{leave.reason}</p>
          </div>

          <div className='flex flex-col space-y-2' >
            <p className="text-sm text-gray-500">Department</p>
            <p className="font-semibold">{leave.employeeId.department.dep_name}</p>
          </div>

          <div className='flex flex-col space-y-2'>
            <p className="text-sm text-gray-500">Start Date</p>
            <p className="font-semibold">{new Date(leave.startDate).toLocaleDateString()}</p>
          </div>
          <div className='flex flex-col space-y-2'>
            <p className="text-sm text-gray-500">End Date</p>
            <p className="font-semibold">{new Date(leave.endDate).toLocaleDateString()}</p>
          </div>
          <div className='flex flex-col space-y-2'>
            <p className="text-sm text-gray-500">
                {leave.status === "Pending" ? "Action" : "Status"}
                </p>
                {leave.status=== "Pending" ? (
                    <div className='flex space-x-2'>
                        <button className="px-2 py-1  text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        onClick={()=> changeStatus(leave._id, "Approved")}>Approve</button>
                        <button className="px-2 py-1  text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
                        onClick={()=> changeStatus(leave._id, "Rejected")}>Reject</button>
                    </div>
                ) :
                <p className="font-semibold">{leave.status}</p>
            }
            
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

export default Detail;