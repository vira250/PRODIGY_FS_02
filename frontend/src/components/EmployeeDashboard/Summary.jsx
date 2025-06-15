import React from 'react';
import {FaUser} from 'react-icons/fa';
import {useAuth} from '../../context/authContext'
const Summary = ()=>{
    const {user} = useAuth();
    console.log("employyee aaaa")
    return (
    <div className="flex items-center bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 p-5">
      <div className="w-14 h-14 flex items-center justify-center bg-blue-600 text-white rounded-full text-2xl shadow">
        <FaUser/>
      </div>
      <div className="ml-4">
        <p className="text-xl text-gray-700 font-bold">Welcome Back</p>
        <p className="text-2xl font-bold text-gray-800">{user.name}</p>
      </div>
    </div>
    )
}

export default Summary;