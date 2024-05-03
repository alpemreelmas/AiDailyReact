import axios from "axios";
import {useNavigate} from "react-router-dom";
import {AUTH_KEY} from "../constants.js";
import {jwtDecode} from "jwt-decode";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
    }
});


axiosInstance.interceptors.request.use(async function (config) {
    const auth = window.localStorage.getItem(AUTH_KEY)
    if(auth){
        const authDecoded = JSON.parse(auth)
        const jwt = jwtDecode(authDecoded.access_token)
        console.log(Date.now().valueOf())
        if(Date.now().valueOf() > jwt.exp){
            const refreshToken = jwtDecode(authDecoded.refresh_token)
            console.log(refreshToken.exp)
            if(Date.now().valueOf() < refreshToken.exp){
                try{
                    const response = await axiosInstance.post("/auth/refresh-token",{refreshToken})
                    if(!response.data.is_error){
                        /*TODO: create a function for herer */
                        window.localStorage.setItem(AUTH_KEY,JSON.stringify(response.data.data))
                    }
                }catch (e) {
                    console.log("axios interceptor err: ", e)
                }
            }
            /*TODO: use navigation */
            window.location = "/login"
        }
    }
    /*axiosInstance.defaults.headers.Authorization = `Bearer token`;*/
    return config;
}, function (error) {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
    if(response.data.statusCode === 401){
        const navigate = useNavigate()
        /*TODO: remove localstorage/sessions */
        window.localStorage.removeItem(AUTH_KEY)
        navigate("/login")
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default axiosInstance;
