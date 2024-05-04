import {Navigate, Outlet} from 'react-router-dom'
import {useAuth} from "../hooks/useAuth.jsx";
import {controlTokensOfUser} from "../lib/services/authService.js";
import {useEffect} from "react";

const ProtectedRoute = () => {
    const { user,logout } = useAuth();
    /* TODO: avoid glitching */
    useEffect(()=>{
        async function check(){
            const credentials = await controlTokensOfUser()
            if(!credentials) logout()
        }
        check()
    },[])

    return user ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoute
