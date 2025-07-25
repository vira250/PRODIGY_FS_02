import React , {useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../context/authContext"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error , setError] = useState(null);
  const {login} = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) =>{
    
    e.preventDefault()
    try{
      const response = await axios.post("http://localhost:5000/api/auth/login", {email, password});
      if(response.data.success){
        login(response.data.user)
        localStorage.setItem("token", response.data.token)
        if(response.data.user.role === "admin"){
          navigate('/admin-dashboard')
        } else{
          navigate("/employee-dashboard")
        }
      }
    } catch (error) {
      if(error.response && !error.response.data.success){
        setError(error.response.data.error);
      } else{
        setError("Server Error")
      }
    }
  }
    return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1650&q=80')",
      }}
    >
      <div className="w-full max-w-md bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-md p-8">
      
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-gray-800">Employee Management System</h1>
          <p className="text-sm text-gray-600">Access your dashboard</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
        
          <div>
            {error && <p className='text-red-500'>{error}</p>}
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@company.com"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/90"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/90"
            />
          </div>

          {/* Options */}
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="mr-2 h-4 w-4 text-blue-600" />
              Remember me
            </label>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2.5 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium shadow-sm transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
    )
}
export default Login;