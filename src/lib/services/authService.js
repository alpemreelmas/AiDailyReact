import {AUTH_KEY} from "../../constants/appConstants.js";
import {jwtDecode} from "jwt-decode";
import axiosInstance from "../axiosInstance.js";
import {REFRESH_TOKEN_URL, RESET_PASSWORD_URL} from "../../constants/routeConstants.js";

export async function controlTokensOfUser() {
    try {
        const auth = window.localStorage.getItem(AUTH_KEY)
        if(!auth) throw new Error("No auth")
        const authDecoded = JSON.parse(auth)
        const jwt = jwtDecode(authDecoded.access_token)
        if (Date.now().valueOf() > new Date(jwt.exp * 1000).valueOf()) {
            return await validateRefreshToken();
        }
        return authDecoded
    }catch (e) {
        console.log("e: ", e)
        window.localStorage.removeItem(AUTH_KEY)
        window.location = "/login"
    }

}
export async function saveCredentials(data){
    window.localStorage.setItem(AUTH_KEY,JSON.stringify(data))
    const newAuth = window.localStorage.getItem(AUTH_KEY)
    return JSON.parse(newAuth)
}

export async function getCredentials(){
    const newAuth = window.localStorage.getItem(AUTH_KEY)
    return JSON.parse(newAuth)
}

export async function validateRefreshToken(){
        const auth = window.localStorage.getItem(AUTH_KEY)
        if(!auth) throw new Error("No auth 1")
        const authDecoded = JSON.parse(auth)
        const refreshToken = jwtDecode(authDecoded.refresh_token)
        if (Date.now().valueOf() < new Date(refreshToken.exp * 1000).valueOf()) {
            const response = await axiosInstance.post(REFRESH_TOKEN_URL, {refreshToken: authDecoded.refresh_token})
            if (!response.data.is_error) {
                return await saveCredentials(response.data.data)
            }
        }
        throw new Error("expired of refresh")

}

export function generateResetPasswordUrl (token){
    return `${RESET_PASSWORD_URL}${token}`
}