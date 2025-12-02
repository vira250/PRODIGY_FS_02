import React from "react";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Add  = () =>{
    const {user} = useAuth()
    const [leave , setLeave] = useState({
        userId: user._id,
    });
    const [formValues, setFormValues] = useState({ startDate: '' });

    const navigate = useNavigate();
    const handleChange = (e) =>{
        const {name , value} = e.target;
        setLeave((prevState) =>({...prevState, [name]: value}));
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    }

    // const handleSubmit = async (e) =>{
    //     e.preventDefault();
    //     try{
    //         const response = await axios.post("http://localhost:5000/api/leave/add",
    //             leave,
    //             {
    //             headers: {
    //                 "Authorization" : `Bearer ${localStorage.getItem('token')}`
    //             }
    //         })
    //         console.log(response.data)
    //         if (response.data.success ) {
    //         navigate("/employee-dashboard/leaves");
    //     }
    //     } catch (error) {
    //         console.log("Axios error:", error); 
    //         if (error.response && !error.response.data.success) {
    //             alert(error.response.data.error);
    //         } else {
    //             alert("Server error. Please try again.");
    //         }
    //     }
    // }

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post("https://employee-api-nine.vercel.app/api/leave/add",
            leave,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
        console.log("Add leave :", response.data);
        
        if (response.data.success && user && user._id) {
            navigate(`/employee-dashboard/leaves/${user._id}`);
        }
    } catch (error) {
        console.log("Axios error:", error);
        if (error.response && !error.response.data.success) {
            alert(error.response.data.error);
        } else {
            alert("Server error. Please try again.");
        }
    }
};



    return(
        <div className="max-w-md mx-auto p-6 mt-10 bg-gray-50 shadow-md rounded-lg">
  <h2 className="text-2xl font-semibold mb-6 text-gray-800">
    Request for Leave
  </h2>

  <form onSubmit={handleSubmit}>
    {/* Leave Type */}
    <div className="mb-4">
      <label htmlFor="leaveType" className="block mb-2 font-semibold text-gray-700">
        Leave Type:
      </label>
      <select
        name="leaveType"
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Leave Type</option>
        <option value="Sick Leave">Sick Leave</option>
        <option value="Casual Leave">Casual Leave</option>
        <option value="Annual Leave">Annual Leave</option>
      </select>
    </div>

    {/* From and To Date */}
    <div className="flex gap-4 mb-4">
      <div className="flex-1">
        <label htmlFor="startDate" className="block mb-2 font-semibold text-gray-700">
          From Date:
        </label>
        <input
          name="startDate"
          type="date"
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          min={new Date().toISOString().split("T")[0]}
        />
      </div>

      <div className="flex-1">
        <label htmlFor="endDate" className="block mb-2 font-semibold text-gray-700">
          To Date:
        </label>
        <input
          name="endDate"
          type="date"
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          min={formValues.startDate ? formValues.startDate : new Date().toISOString().split("T")[0]}
        />
      </div>
    </div>

    {/* Description */}
    <div className="mb-4">
      <label htmlFor="reason" className="block mb-2 font-semibold text-gray-700">
        Description:
      </label>
      <textarea
        name="reason"
        placeholder="Reason"
        onChange={handleChange}
        required
        rows="4"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full p-2 bg-blue-500 text-gray-50 font-semibold rounded-md hover:bg-blue-600 transition duration-200"
    >
      Submit
    </button>
  </form>
</div>

    )
}

export default Add;