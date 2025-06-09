import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper';
import {useEffect} from 'react';
import axios from 'axios';
const DepartmentList =() =>{

    const [departments, setDepartments] = React.useState([]);
    const [deploading, setDeploading] = useState(false)

useEffect(() =>{
    const fetchDepartments = async () =>{
        setDeploading(true)
        try{
            const response = await axios.get('http://localhost:5000/api/department',{
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log("Fetched departments:", response.data);
            if(response.data.success && Array.isArray(response.data.data)){
                let sno=1;
                const data = response.data.data.map((dep) => ({
                       _id: dep._id,
                       sno: sno++,
                       name: dep.dep_name,
                       action: (<DepartmentButtons/>)
                    }));
                setDepartments(data)
            }
        } catch (error) {
            console.log("Axios error:", error); 
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            } else {
                alert("Server error. Please try again.");
            }
        } finally {
            setDeploading(false)
        }
    }
    fetchDepartments();
}, [])

return(
    <>{deploading ? <div>Loading...</div> : 
<div className="p-4 bg-white rounded-lg shadow-sm">
      {/* Heading */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Manage Departments</h3>
      </div>

      {/* Search and Add Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <input
          type="text"
          placeholder="Search by Department Name"
          className="px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 w-full sm:w-1/2"
        />

        <Link
          to="/admin-dashboard/add-department"
          className="px-4 py-1.5 text-bold bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          + Add Department
        </Link>
      </div>
      <div>
        <DataTable
            columns={columns}
            data={departments}
        />
      </div>
    </div>
    }</>
    )
}
export default DepartmentList;