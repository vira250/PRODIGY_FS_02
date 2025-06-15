import React from 'react';
import {useAuth} from '../../context/authContext'
const Navbar = () =>{
    const {user, logout} = useAuth()
    return (
        <div className="flex items-center justify-between h-14 bg-gradient-to-r from-blue-500 to-blue-700 px-6 shadow-lg">
  <p className="text-white font-semibold text-lg">
    Welcome, <span className="underline decoration-yellow-300 decoration-2">{user.name}</span>
  </p>
  <button className="px-5 py-2 bg-yellow-400 text-blue-900 font-semibold rounded-lg shadow-md transition duration-300 hover:bg-yellow-500 hover:shadow-lg"
  onClick={logout}>
    Logout
  </button>
</div>

    )
}
export default Navbar;