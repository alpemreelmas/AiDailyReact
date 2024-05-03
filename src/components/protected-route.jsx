import {Navigate, Outlet} from 'react-router-dom'
import {useAuth} from "../hooks/useAuth.jsx";
import {AUTH_KEY} from "../constants.js";
import {jwtDecode} from "jwt-decode";
import axiosInstance from "../lib/axiosInstance.js";

const ProtectedRoute = () => {
    const { user,logout } = useAuth();
    if(!checkToken(user)) logout()
    return user ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoute


async function checkToken(user){
    const auth = user
    if(auth){
        const authDecoded = JSON.parse(auth)
        const jwt = jwtDecode(authDecoded.access_token)
        if(Date.now().valueOf() > jwt.exp){
            const refreshToken = jwtDecode(authDecoded.refresh_token)
            if(Date.now().valueOf() < refreshToken.exp){
                try{
                    const response = await axiosInstance.post("/auth/refresh-token",{refreshToken})
                    if(!response.data.is_error){
                        /*TODO: create a function for herer */
                        window.localStorage.setItem(AUTH_KEY,JSON.stringify(response.data.data))
                        return true
                    }
                }catch (e) {
                    console.log("axios interceptor err: ", e)
                }
            }
            return false
        }
        return true
    }
}