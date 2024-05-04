import axios from "axios";
import {AUTH_KEY} from "../constants/appConstants.js";
import {controlTokensOfUser, validateRefreshToken} from "./services/authService.js";
import {redirect} from "react-router-dom";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
    }
});


axiosInstance.interceptors.request.use(async function (config) {
    const credentials = await controlTokensOfUser()
    config.headers.Authorization = `Bearer ${credentials?.access_token}`;
    return config;
}, function (error) {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.log(error)
    if(error.response.status === 401){
       if(!validateRefreshToken()){
           window.localStorage.removeItem(AUTH_KEY)
           window.location= "/login"
       }
    }
    return Promise.reject(error);
});

export default axiosInstance;
