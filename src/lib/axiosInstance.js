import axios from "axios";
import {getCredentials, validateRefreshToken} from "./services/authService.js";
import {AUTH_KEY} from "../constants/appConstants.js";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
    }
});


axiosInstance.interceptors.request.use(async function (config) {
    const credentials = await getCredentials()
    config.headers.Authorization = `Bearer ${credentials?.access_token}`;
    return config;
}, function (error) {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if(error.response.status === 401){
       if(!validateRefreshToken()){
           window.localStorage.removeItem(AUTH_KEY)
           window.location= "/login"
       }
    }else{
        return Promise.reject(error);
    }
});

export default axiosInstance;
