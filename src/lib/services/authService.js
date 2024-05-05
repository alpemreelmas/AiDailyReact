import {AUTH_KEY} from "../../constants/appConstants.js";
import {jwtDecode} from "jwt-decode";
import axiosInstance from "../axiosInstance.js";
import {REFRESH_TOKEN_URL} from "../../constants/routeConstants.js";

export async function controlTokensOfUser() {
    try {
        const auth = window.localStorage.getItem(AUTH_KEY)
        if(!auth) return null
        const authDecoded = JSON.parse(auth)
        const jwt = jwtDecode(authDecoded.access_token)
        if (Date.now().valueOf() > new Date(jwt.exp * 1000).valueOf()) {
            await validateRefreshToken()
        }
        return authDecoded
    }catch (e) {
        window.localStorage.removeItem(AUTH_KEY)
        window.location = "/login"
    }

}
export async function saveCredentials(data){
    window.localStorage.setItem(AUTH_KEY,JSON.stringify(data))
    const newAuth = window.localStorage.getItem(AUTH_KEY)
    return JSON.parse(newAuth)
}

export async function validateRefreshToken(){
    try{
        const auth = window.localStorage.getItem(AUTH_KEY)
        if(!auth) return null
        const authDecoded = JSON.parse(auth)
        const refreshToken = jwtDecode(authDecoded.refresh_token)
        if (Date.now().valueOf() < new Date(refreshToken.exp * 1000).valueOf()) {
            try {
                console.log("sıçtıı")
                const response = await axiosInstance.post(REFRESH_TOKEN_URL, {refreshToken: authDecoded.refresh_token})
                if (!response.data.is_error) {
                    
                    return {auth:true, credentials: await saveCredentials(response.data.data)}
                }
                console.log(response.data)
            } catch (e) {
                console.log("axios interceptor err: ", e)
            }
        }
        return authDecoded
    }catch (e) {
        window.localStorage.removeItem(AUTH_KEY)
        window.location = "/login"
    }

}