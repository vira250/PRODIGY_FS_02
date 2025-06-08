import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUser } from 'react-icons/fa';

 const AdminSidebar = () =>{
  return (
<div className="bg-white text-gray-800 h-screen fixed left-0 top-0 bottom-0 w-64 shadow-lg border-r border-gray-200">
  {/* Sidebar Header */}
  <div className="bg-blue-600 h-16 flex items-center justify-center rounded-br-3xl shadow-md">
    <h3 className="text-2xl font-bold tracking-wide text-white">Employee MS</h3>
  </div>

  {/* Sidebar Links */}
  <div className="px-4 mt-6 space-y-3 text-sm font-medium">
    <NavLink
      to="/admin-dashboard"
      className={({ isActive }) =>
        `${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"} 
        flex items-center gap-3 py-2.5 px-4 rounded-lg transition duration-300 ease-in-out`
      } end>
      <FaTachometerAlt className="text-lg" />
      <span>Dashboard</span>
    </NavLink>

    <NavLink
      to="/admin-dashboard"
      className="flex items-center gap-3 py-2.5 px-4 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-300 ease-in-out">
      <FaUser className="text-lg" />
      <span>Employees</span>
    </NavLink>

    <NavLink
      to="/admin-dashboard/departments"
      className={({ isActive }) =>
        `${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"} 
        flex items-center gap-3 py-2.5 px-4 rounded-lg transition duration-300 ease-in-out`
      }>
      <FaBuilding className="text-lg" />
      <span>Departments</span>
    </NavLink>

    <NavLink
      to="/admin-dashboard"
      className="flex items-center gap-3 py-2.5 px-4 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-300 ease-in-out">
      <FaCalendarAlt className="text-lg" />
      <span>Leaves</span>
    </NavLink>

    <NavLink
      to="/admin-dashboard"
      className="flex items-center gap-3 py-2.5 px-4 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-300 ease-in-out">
      <FaMoneyBillWave className="text-lg" />
      <span>Salary</span>
    </NavLink>

    <NavLink
      to="/admin-dashboard"
      className="flex items-center gap-3 py-2.5 px-4 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-300 ease-in-out">
      <FaCogs className="text-lg" />
      <span>Settings</span>
    </NavLink>
  </div>
</div>

    )
 }

 export default AdminSidebar