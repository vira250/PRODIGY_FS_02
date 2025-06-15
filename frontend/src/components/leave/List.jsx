import React from "react";
import { Link } from "react-router-dom";
import {useAuth} from '../../context/authContext'
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'
const List =()=>{
const {user} = useAuth()
const [leaves , setLeaves] = useState([])
let sno = 1
  const fetchLeaves = async () =>{
        try{
            const response = await axios.get(`http://localhost:5000/api/leave/${user._id}`, {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`,
                },
            })
            console.log(response.data)
            if(response.data.success){
                setLeaves(response.data.leaves);
            }
        } catch(error){
            if(error.response && !error.response.data.success){
                alert(error.message)
            }
        }
    }

    useEffect(()=>{
        fetchLeaves();
    }, []);
    return(
        <div className="p-4 bg-white rounded-lg shadow-sm">
            <div className="text-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Manage Leaves</h3>
            </div>

      {/* Search and Add Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <input
          type="text"
          placeholder="Search by Dep Name"
          className="px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 w-full sm:w-1/2"
          />

        <Link
          to="/employee-dashboard/add-leave"
          className="px-4 py-1.5 text-bold bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
          + Add Leave
        </Link>
      </div>
          <div className="bg-white shadow-md rounded-lg p-6">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-gray-500 font-semibold text-center">SNO</th>
                <th className="px-4 py-2 text-gray-500 font-semibold text-center">
                   Leave Type
                </th>
                <th className="px-4 py-2 text-gray-500 font-semibold text-center">
                   From
                </th>
                <th className="px-4 py-2 text-gray-500 font-semibold text-center">
                   To
                </th>
                <th className="px-4 py-2 text-gray-500 font-semibold text-center">
                   Description
                </th>
                <th className="px-4 py-2 text-gray-500 font-semibold text-center">
                   Status
                </th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr
                   key={leave.id}
                   className="border-t hover:bg-gray-50 transition duration-200 text-center">
                   <td className="px-4 py-2 text-gray-900 text-center">
                     {sno++}
                   </td>
                   <td className="px-4 py-2 text-gray-900 text-center">
                     {leave.leaveType}
                   </td>
                   <td className="px-4 py-2 text-gray-900 text-center">
                     {new Date(leave.startDate).toLocaleDateString()}
                   </td>
                   <td className="px-4 py-2 text-gray-900 text-center">
                     {new Date(leave.endDate).toLocaleDateString()}
                   </td>
                   <td className="px-4 py-2 text-gray-900 text-center">
                     {leave.reason}
                   </td>
                   <td className="px-4 py-2 text-gray-900 text-center">
                     {leave.status}
                   </td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>
      </div>
    )
}

export default List;