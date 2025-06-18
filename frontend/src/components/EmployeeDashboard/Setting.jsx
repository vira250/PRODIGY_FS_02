import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { useState } from "react";

const Setting = () =>{

const navigate = useNavigate();
const {user} = useAuth()
const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
});
const [error, setError] = useState(null);


    const handleChange = (e) =>{
        const {name, value} = e.target;
        setSetting({...setting, [name]: value});

    } 

    const handleSubmit =async (e) =>{
        e.preventDefault();
        if(setting.newPassword !== setting.confirmPassword){
            setError("Passwords do not match");
        } else {
            try{
                const response = await axios.put("http://localhost:5000/api/setting/change-password",setting,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,

                        }
                    }
                )
                if(user.role === "admin"){
                if(response.data.success){
                    navigate("/admin-dashboard")
                    setError("")
                }}
                else if(user.role === "employee"){
                  if(response.data.success){
                    navigate("/employee-dashboard")
                  }
                }
            } catch (error) {
            if(error.response && !error.response.data.success){
                setError(error.response.data.message);
            }
        }
        } 
    }
    return(
        <div className="p-20 bg-gray-100 min-h-screen">
  <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
      Change Password
    </h2>
    <p>{error}</p>
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div>
        <label htmlFor="oldPassword" className="block text-gray-600 font-semibold mb-1">
          Old Password
        </label>
        <input
          id="oldPassword"
          name="oldPassword"
          type="password"
          placeholder="Enter Old Password"
          required
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="newPassword" className="block text-gray-600 font-semibold mb-1">
          New Password
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          placeholder="Enter New Password"
          required
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-gray-600 font-semibold mb-1">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password Again"
          required
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 font-semibold text-center text-gray-100 bg-blue-600 rounded-md shadow transition transform hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Change Password
      </button>
    </form>
  </div>
</div>

    )
}

export default Setting;