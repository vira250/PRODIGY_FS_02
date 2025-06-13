import React, { useEffect } from "react";
import fetchDepartments from "../../utils/EmployeeHelper";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {getEmployees} from '../../utils/EmployeeHelper';

const Add = () =>{
    const Navigate = useNavigate();
    const [salary , setSalary] = useState({
        employeeId: null,
        basicSalary: 0,
        allowances : null,
        deductions : 0,
        payDate : null,
    });
    const [departments , setDepartments] = useState(null);
    const[employees , setEmployees] = useState([]);
    useEffect(() =>{
        const getDepartments = async () =>{
         const departments = await fetchDepartments()
         setDepartments(departments);
        }
        getDepartments();
    }, [])

    const handleDepartment= async (e) =>{
        const emps = await getEmployees(e.target.value)
        setEmployees(emps)
    }

    const handleChange = (e) =>{
      const {name, value, files} = e.target;
        setSalary((prevData)=>({...prevData, [name]: value}))
    }
    

const handleSubmit = async (e) =>{
        e.preventDefault();
          try {
    const response = await axios.post(`http://localhost:5000/api/salary/add`,
      salary,
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    console.log("Response from server:", response.data);

    if (response.data.success) {
      Navigate("/admin-dashboard/employees");
    } else {
      console.error("Failed to edit employee:", response.data.error);
      alert(response.data.error || "Unknown error");
    }
  } catch (error) {
    console.error("Axios error:", error);
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    } else {
      alert("Server error. Please try again.");
    }
  }

    }


    return(
        <>{departments ? (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add Salary</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <select
            name="department"
            onChange={handleDepartment}
            // required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
          >
            <option value="">Select Department</option>
                {departments.map((dep) =>(
                    <option key= {dep._id} value={dep._id}>{dep.dep_name}</option>
                ))}
          </select>
        </div>
        {/* Employee */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
          <select
            name="employeeId"
            onChange={handleChange}
            // required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
          >
            <option value="">Select Employee</option>
                {employees.map((emp) =>(
                    <option key= {emp._id} value={emp._id}>{emp.employeeId}</option>
                ))}
          </select>
        </div>

        {/* Designation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Basic Salary</label>
          <input
            type="number"
            name="basicSalary"
            onChange={handleChange}
            placeholder="Basic Salary"
            // required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Salary */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Allowances</label>
          <input
            type="number"
            name="allowances"
            onChange={handleChange}
            placeholder="Allowances"
            // required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deductions</label>
          <input
            type="number"
            name="deductions"
            onChange={handleChange}
            placeholder="Deductions"
            // required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pay Date</label>
          <input
            type="date"
            name="payDate"
            onChange={handleChange}
            // required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

      <div className="md:col-span-2 mt-6 flex justify-center">
        <button
          type="submit"
           className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition duration-200">
          Add Salary
        </button>
      </div>
    </form>
    </div>
    ) : <div>Loading</div>}</>
    ) 
}

export default Add;