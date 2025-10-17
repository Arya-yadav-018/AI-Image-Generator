import {createContext, useState} from "react";
import { toast } from 'react-toastify'
import axios from 'axios'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext()

const AppContextProvider = (props)=>{

   const [user , setUser] = useState(null);

   const [showLogin , setShowLogin] = useState(false);

   const [token , setToken] = useState(localStorage.getItem('token'))

   const [credit , setCredit] = useState(false)

   const backendurl = import.meta.env.VITE_BACKEND_URL

   axios.defaults.withCredentials = true;

   const navigate = useNavigate()

   const laodCreditsData = async()=>{
         try{
            const {data} = await axios.get(backendurl + '/api/user/credits' , { withCredentials: true })

            if(data.success){
                setCredit(data.credits)  
                setUser(data.user)   
            }

         }catch(error){
            console.log(error)
           toast.error(error.response?.data?.message || error.message);
         }
   }

  const generateImage = async (prompt) => {
  try {
    const { data } = await axios.post(
      backendurl + '/api/image/generateimage',
      { prompt },
      { withCredentials: true }
    );

    if (data.success) {
      laodCreditsData();
      return data.resultImage;
    } else {
      toast.error(data.message);
      laodCreditsData();
    }
  } catch (error) {
    console.error(error);

    // Handle no credits case
    if (error.response && error.response.status === 403) {
      toast.error("No credits left! Redirecting to Buy page...");
      navigate("/buy");
    } else {
      toast.error(error.response?.data?.message || error.message);
    }
  }
};



const handleLogout = async () => {
  try {
    await axios.post(backendurl + "/api/user/logout", {}, { withCredentials: true });
    setUser(null);
    setCredit(0); // reset
    toast.success("Logged out successfully");
  } catch (error) {
    toast.error("Logout failed");
  }
};
//     const logout = ()=>{
//        localStorage.removeItem('token');
//        setToken('')
//          setUser(null)    
//     }
     
   useEffect(()=> {
       if(token){
          laodCreditsData()
       }  
   }, [token])

   
   const value = {
         user, setUser , showLogin , setShowLogin , backendurl , token , setToken , credit , setCredit , laodCreditsData , handleLogout , generateImage
   }

   return (
       <AppContext.Provider value={value}>
             {props.children}
       </AppContext.Provider>
   )

}

export default AppContextProvider