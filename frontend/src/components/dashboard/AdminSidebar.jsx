

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUser,
  FaTimes,
} from "react-icons/fa";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-lg shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`bg-white text-gray-800 h-screen fixed top-0 left-0 w-64 shadow-lg border-r border-gray-200
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
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
              flex items-center gap-3 py-2.5 px-4 rounded-lg transition duration-300`
            }
            end
            onClick={() => setIsOpen(false)}
          >
            <FaTachometerAlt className="text-lg" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/employees"
            className={({ isActive }) =>
              `${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"} 
              flex items-center gap-3 py-2.5 px-4 rounded-lg transition duration-300`
            }
            onClick={() => setIsOpen(false)}
          >
            <FaUser className="text-lg" />
            <span>Employees</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/departments"
            className={({ isActive }) =>
              `${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"} 
              flex items-center gap-3 py-2.5 px-4 rounded-lg transition duration-300`
            }
            end
            onClick={() => setIsOpen(false)}
          >
            <FaBuilding className="text-lg" />
            <span>Departments</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/leaves"
            className={({ isActive }) =>
              `${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"} 
              flex items-center gap-3 py-2.5 px-4 rounded-lg transition duration-300`
            }
            end
            onClick={() => setIsOpen(false)}
          >
            <FaCalendarAlt className="text-lg" />
            <span>Leaves</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/salary/add"
            className={({ isActive }) =>
              `${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"} 
              flex items-center gap-3 py-2.5 px-4 rounded-lg transition duration-300`
            }
            end
            onClick={() => setIsOpen(false)}
          >
            <FaMoneyBillWave className="text-lg" />
            <span>Salary</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/setting"
            className={({ isActive }) =>
              `${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"} 
              flex items-center gap-3 py-2.5 px-4 rounded-lg transition duration-300`
            }
            end
            onClick={() => setIsOpen(false)}
          >
            <FaCogs className="text-lg" />
            <span>Settings</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
