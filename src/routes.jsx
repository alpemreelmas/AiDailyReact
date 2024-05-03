import HomePage from "./HomePage.jsx";
import ErrorPage from "./pages/error-page.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Daily from "./pages/Daily.jsx";
import Layout from "./components/layout/Layout.jsx";
import {useRoutes} from "react-router-dom";
export const ROUTES = [
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
/*    {
        path: "*",
        element: <div>NOT FOUND</div>
    }*/
]

export function Routes(){
    const routes = useRoutes(ROUTES);
    return routes
}