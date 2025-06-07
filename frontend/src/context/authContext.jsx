import axios from 'axios';
import React from 'react';
import { createContext , useState , useContext, useEffect } from 'react';

const userContext = createContext()
const authContext = ({children}) =>{
    const [user, setUser] =useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
    const verifyUser = async () =>{
        try {
            const token = localStorage.getItem('token');
            if(token){
                const response = await axios.get('http://localhost:5000/api/auth/verify', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if(response.data.success){
                    setUser(response.data.user)
                }
            } else{
            setUser(null)
        }
        } catch(error){
           if(error.response && !error.response.data.error){
            setUser(null)
           }
        } finally{
            setLoading(false)
        }
    }

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    verifyUser()
  }, []);

    const login = (userData) =>{
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
    }

    const logout = () =>{
        setUser(null)
        localStorage.removeItem('user')
        localStorage.removeItem("token")
    }
    return(
       <userContext.Provider value={{user, login, logout, loading}}>
            {children}
       </userContext.Provider>
    )
}

export const useAuth = () => useContext(userContext)
export default authContext;