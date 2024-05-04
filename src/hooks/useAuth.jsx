import { createContext, useContext, useMemo } from "react";
import {redirect} from "react-router-dom";
import { AUTH_KEY} from "../constants/appConstants.js";
import {saveCredentials} from "../lib/services/authService.js";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const user = window.localStorage.getItem(AUTH_KEY) || null

    // call this function when you want to authenticate the user
    const login = async (data) => {
        await saveCredentials(data)
        /*TODO use redirect()*/
        window.location = "/daily"
    };

    // call this function to sign out logged in user
    const logout = () => {
        window.localStorage.removeItem(AUTH_KEY)
        redirect("/login", { replace: true });
    };

    const value = useMemo(
        () => ({
            user,
            login,
            logout,
        }),
        [user]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};