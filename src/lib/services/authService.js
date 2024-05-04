import {AUTH_KEY} from "../../constants/appConstants.js";
import {jwtDecode} from "jwt-decode";
import axiosInstance from "../axiosInstance.js";
import {REFRESH_TOKEN_URL} from "../../constants/routeConstants.js";

export async function controlTokensOfUser() {
    const auth = window.localStorage.getItem(AUTH_KEY)
    if(!auth) return null
    const authDecoded = JSON.parse(auth)
    const jwt = jwtDecode(authDecoded.access_token)
    if (Date.now().valueOf() > jwt.exp) {
        const refreshToken = jwtDecode(authDecoded.refresh_token)
        if (Date.now().valueOf() < refreshToken.exp) {
            try {
                const response = await axiosInstance.post(REFRESH_TOKEN_URL, {refreshToken})
                if (!response.data.is_error) {
                    return {auth:true, credentials: await saveCredentials(response.data.data)}
                }
            } catch (e) {
                console.log("axios interceptor err: ", e)
            }
        }
        return authDecoded
    }
    return authDecoded
}
export async function saveCredentials(data){
    window.localStorage.setItem(AUTH_KEY,JSON.stringify(data))
    const newAuth = window.localStorage.getItem(AUTH_KEY)
    return JSON.parse(newAuth)
}