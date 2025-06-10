import React from "react";
import { Link } from "react-router-dom";
const List = () =>{
    return(
        <div className="p-4 bg-white rounded-lg shadow-sm">
            <div className="text-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Manage Employees</h3>
            </div>

      {/* Search and Add Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <input
          type="text"
          placeholder="Search by Employee Name"
          className="px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 w-full sm:w-1/2"
        />

        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1.5 text-bold bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          + Add Employee
        </Link>
      </div>
        </div>
    )
}

export default List;