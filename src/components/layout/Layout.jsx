import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import {Outlet} from "react-router-dom";
import ProtectedRoute from "../protected-route.jsx";

function Layout() {
    return (
        <div id="wrapper">
            <Header/>
            <Sidebar/>
            <div id='main-content'>
                <Outlet/>
            </div>
        </div>
    )
}

export default Layout