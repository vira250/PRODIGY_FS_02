import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const View = () =>{
    const [salaries, setSalaries] = useState(null);
    const [filteredSalaries, setFilteredSalaries] = useState(null);
    const {id} = useParams();
    let sno = 1;

    const fetchSalaries = async () =>{
        try{
            const response = await axios.get(`http://localhost:5000/api/salary/${id}`, {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`,
                },
            })
            console.log(response.data)

            if(response.data.success){
                setSalaries(response.data.salary);
                setFilteredSalaries(response.data.salary);
            }
        } catch(error){
            if(error.response && !error.response.data.success){
                alert(error.message)
            }
        }
    }

    useEffect(()=>{
        fetchSalaries();
    }, []);

    const filterSalaries = (q) =>{
        const filteredRecords = salaries.filter((leave) =>
            leave.name.toLocalLowerCase().includes(q.toLocalLowerCase())
        );
        setFilteredSalaries(filteredRecords)
    }
    return(
<>
  {filteredSalaries == null ? (
    <div className="flex justify-center items-center p-6">
      <div className="text-gray-500 font-semibold">Loading...</div>
    </div>
  ) : (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Salary History
        </h2>
        <input
          type="text"
          placeholder="Search by Emp ID"
          onChange={filterSalaries}
          className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>

      {filteredSalaries.length > 0 ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-gray-500 font-semibold text-center">SNO</th>
                <th className="px-4 py-2 text-gray-500 font-semibold text-center">
                   Emp ID
                </th>
                <th className="px-4 py-2 text-gray-500 font-semibold text-center">
                   Salary
                </th>
                <th className="px-4 py-2 text-gray-500 font-semibold text-center">
                   Allowances
                </th>
                <th className="px-4 py-2 text-gray-500 font-semibold text-center">
                   Deduction
                </th>
                <th className="px-4 py-2 text-gray-500 font-semibold text-center">
                   Net Salary
                </th>
                <th className="px-4 py-2 text-gray-500 font-semibold text-center">
                   Pay Date
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSalaries.map((salary, index) => (
                <tr
                   key={salary.id}
                   className="border-t hover:bg-gray-50 transition duration-200 text-center">
                   <td className="px-4 py-2 text-gray-900 text-center">
                     {index + 1}
                   </td>
                   <td className="px-4 py-2 text-gray-900 text-center">
                     {salary.employeeId.employeeId}
                   </td>
                   <td className="px-4 py-2 text-gray-900 text-center">
                     {salary.basicSalary}
                   </td>
                   <td className="px-4 py-2 text-gray-900 text-center">
                     {salary.allowances}
                   </td>
                   <td className="px-4 py-2 text-gray-900 text-center">
                     {salary.deductions}
                   </td>
                   <td className="px-4 py-2 text-gray-900 text-center">
                     {salary.netSalary}
                   </td>
                   <td className="px-4 py-2 text-gray-900 text-center">
                     {new Date(salary.payDate).toLocaleDateString()}
                   </td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center items-center p-6">
          <span className="text-gray-500 font-semibold">
            No Records
          </span>
        </div>
      )}

    </div>
  )}

</>

    )
}

export default View;