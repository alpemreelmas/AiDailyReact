import HomePage from "./HomePage.jsx";
import ErrorPage from "./pages/error-page.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Daily from "./pages/Daily.jsx";
import Layout from "./components/layout/Layout.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx"
import {createBrowserRouter, createRoutesFromElements, Route, useRoutes} from "react-router-dom";
import ProtectedRoute from "./components/protected-route.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
import Settings from "./components/settings.jsx";
/*export const ROUTES = [
    {
        path: "",
        element: <Layout />,
        errorElement: <ErrorPage/>,
        children: [
            {
              path: "/",
              element: <HomePage />
            },
            {
                path: "/daily",
                element: <Daily/>
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
/!*    {
        path: "*",
        element: <div>NOT FOUND</div>
    }*!/
]*/


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route element={<ProtectedRoute/>} >
                <Route element={<Layout/>}>
                    <Route path="" element={<HomePage />} />
                    <Route path="daily" element={<Daily />} />
                    <Route path="settings" element={<Settings />} />
                </Route>

            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password/reset" element={<ResetPassword />} />
            <Route path="*" element={<h1>Page not found</h1>} />
        </Route>

    )
);