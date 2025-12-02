import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";

const List = () =>{

  const [employees, setEmployees] = useState([]);
  const [emploading, setEmploading] = useState(false)
  const  [filteredEmployee, setFilteredEmployee] = useState([]);

  useEffect(() =>{
      const fetchEmployees = async () =>{
          setEmploading(true)
          try{
              const response = await axios.get('https://employee-api-nine.vercel.app/api/employees',{
                  headers: {
                      "Authorization" : `Bearer ${localStorage.getItem('token')}`
                  }
              })
              console.log(response.data)
              console.log("Full response:", response.data);
              if(response.data.success && Array.isArray(response.data.employees)){
                  let sno=1;
                  const data = response.data.employees.map((emp) => ({
                         _id: emp._id,
                         sno: sno++,
                         dep_name: emp.department.dep_name,
                         name: emp.userId.name,
                         dob : new Date(emp.dob).toLocaleDateString(),
                         profileImage:<img width={60} className="rounded-full" src={`https://employee-api-nine.vercel.app/${emp.userId.profileImage}`}/>,
                         action: (<EmployeeButtons Id={emp._id}/>)
                      }));
                  setEmployees(data)
                  setFilteredEmployee(data)
              }
          } catch (error) {
              console.log("Axios error:", error); 
              if (error.response && !error.response.data.success) {
                  alert(error.response.data.error);
              } else {
                  alert("Server error. Please try again.");
              }
          } finally {
              setEmploading(false)
          }
      }
      fetchEmployees();
  }, [])

  const handleFilter = (e) =>{
    const value = e.target.value.toLowerCase();
    const records = employees.filter((emp) =>(
        emp.name.toLowerCase().includes(value) || 
        emp.dep_name.toLowerCase().includes(value)
    ))
    setFilteredEmployee(records)
  }

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
          onChange={handleFilter}/>

        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1.5 text-bold bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
          + Add Employee
        </Link>
      </div>
      <div>
        <DataTable columns={columns} data={filteredEmployee} pagination>

        </DataTable>
      </div>
        </div>
    )
}

export default List;