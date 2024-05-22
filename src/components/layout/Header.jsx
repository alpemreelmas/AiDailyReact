import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import Settings from '../settings.jsx';
import { Link } from 'react-router-dom';

function Header() {

    const location = useLocation();

    const [SidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setSidebarOpen(!SidebarOpen);
    };

    let title;
    switch (location.pathname) {
        case '/notes':
            title = "Notes";
            break;
        default:
            title = "Home"
            break;
    }

    return (
        <>
        
        <nav className="navbar top-navbar">
            <div className="container-fluid">
                <div
                className="navbar-left"
                style={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
                >
                <h4 className="headerTitle">{title}</h4>
                </div>
                <div className="navbar-right">
                <div id="navbar-menu">
                    <ul className="nav navbar-nav">
                    <li>
                        <a
                        href="javascript:void(0);"
                        className="search_toggle icon-menu"
                        title="Search Result"
                        >
                        <i className="icon-magnifier" />
                        </a>
                    </li>
                    <li>
                        <a href="{{route('authentication.login')}}" className="icon-menu">
                        <i className="icon-power" />
                        </a>
                    </li>
                    <li>
                    <Link to="/settings" className="icon-menu settings-button">
                        <i className="icon-settings"/>
                    </Link>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
            <div className="progress-container">
                <div className="progress-bar" id="myBar" />
            </div>
        </nav>
        </>
    );
}

export default Header;