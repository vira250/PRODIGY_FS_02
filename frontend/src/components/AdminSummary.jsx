import React from "react";
import SummaryCard from "./dashboard/SummaryCard";
import { FaBuilding, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers, FaCheckCircle } from "react-icons/fa";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const AdminSummary= () =>{

  const [summary, setSummary] = useState(null);

  useEffect(() =>{
    const fetchSummary = async () =>{
      try{
        const summary = await axios.get( "http://localhost:5000/api/dashboard/summary", {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
          }
        })
        setSummary(summary.data);
      } catch (error) {
        if(error.response){
          alert(error.response.data.error)
        }
        console.log(error.message)
      }
    }
    fetchSummary();
  }, [])

  if (!summary){
    return <div>Loading...</div>
  }
    return(
    <div className="p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Dashboard Overview</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <SummaryCard icon={<FaUsers />} text="Total Employees" number={summary.totalEmployees} color="bg-blue-600"/>
        <SummaryCard icon={<FaBuilding />} text="Total Departments" number={summary.totalDepartments} color="bg-cyan-600"/>
        <SummaryCard icon={<FaMoneyBillWave />} text="Monthly Salary" number={summary.totalSalary} color="bg-cyan-600"/>
      </div>
      <div className="mt-12">
        <h4 className="text-center text-2x1 font-bold">Leave Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <SummaryCard icon={<FaFileAlt/>} text="Leave Applied" number={summary.leaveSummary.appliedFor} color="bg-red-600"/>
            <SummaryCard icon={<FaCheckCircle/>} text="Leave Approved" number={summary.leaveSummary.approved} color="bg-green-600"/>
            <SummaryCard icon={<FaHourglassHalf/>} text="Leave Pending" number={summary.leaveSummary.pending} color=" bg-yellow-600"/>
            <SummaryCard icon={<FaTimesCircle/>} text="Leave Rejected" number={summary.leaveSummary.rejected} color=" bg-red-600"/>
        </div>
      </div>
    </div>
    )
}

export default AdminSummary;