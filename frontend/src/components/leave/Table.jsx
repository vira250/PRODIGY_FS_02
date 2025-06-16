import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";
import { useState } from "react";
import axios from "axios";
const Table = () =>{
    const [leaves , setLeaves] = useState(null)
    const fetchLeaves = async () =>{
        try{
              const response = await axios.get('http://localhost:5000/api/leave',{
                  headers: {
                      "Authorization" : `Bearer ${localStorage.getItem('token')}`
                  }
              })
              console.log(response.data)
              console.log("Full response:", response.data);
              if(response.data.success){
                  let sno=1;
                  const data = await response.data.leaves.map((leave) => ({
                         _id: leave._id,
                         sno: sno++,
                         employeeId: leave.employeeId.employeeId,
                         name: leave.employeeId.userId.name,
                         leaveType: leave.leaveType,
                         department : leave.employeeId.department.dep_name,
                         days:
                         new Date(leave.endDate).getDate()-
                         new Date(leave.startDate).getDate(),
                         status: leave.status,
                         action: (<LeaveButtons Id={leave._id}/>)
                      }));
                  setLeaves(data)
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
    useEffect(() =>{
        fetchLeaves()
    }, [])
    return(
        <>
        {leaves ? (
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
        <div className="flex space-x-4">
        <button className="px-4 py-1.5 text-bold bg-blue-600 text-white rounded hover:bg-blue-700 transition">Pending</button>
        <button className="px-4 py-1.5 text-bold bg-blue-600 text-white rounded hover:bg-blue-700 transition">Approved</button>
        <button className="px-4 py-1.5 text-bold bg-blue-600 text-white rounded hover:bg-blue-700 transition">Rejected</button>
        </div>
      </div>
      <DataTable columns={columns} data={leaves}  pagination/>
        </div>
        ) : <div>Loading...</div>}
        </>
    )
}

export default Table;