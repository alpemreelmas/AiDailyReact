import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_KEY} from "../constants.js";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const user = window.localStorage.getItem(AUTH_KEY) || null
    const navigate = useNavigate();

    // call this function when you want to authenticate the user
    const login = async (data) => {
        window.localStorage.setItem(AUTH_KEY,JSON.stringify(data))
        navigate("/");
    };

    // call this function to sign out logged in user
    const logout = () => {
        window.localStorage.removeItem(AUTH_KEY)
        navigate("/login", { replace: true });
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