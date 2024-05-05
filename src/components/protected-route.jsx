import {Navigate, Outlet} from 'react-router-dom'
import {useAuth} from "../hooks/useAuth.jsx";
import {controlTokensOfUser} from "../lib/services/authService.js";
import {useEffect,useState} from "react";

const ProtectedRoute = () => {
    const { user, logout } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            if (user) {
                try {
                    const credentials = await controlTokensOfUser();
                    if (credentials) {
                        setIsAuthenticated(true);
                    } else {
                        logout();
                    }
                } catch (error) {
                    console.error('Error checking authentication:', error);
                    logout();
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [user, logout]);

    if (isLoading) {
        // Display loading indicator or component while checking authentication
        return <div>Loading...</div>;
    }

    // Render based on authentication status
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
