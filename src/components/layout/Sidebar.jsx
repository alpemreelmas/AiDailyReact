import { Link } from 'react-router-dom';
import ChevronLeft from "../../../public/chevron-left.svg";
import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../lib/axiosInstance.js";

function Sidebar() {

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [user, setUser] = useState(null)
    const [name, setName] = useState('');

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const respone = await axiosInstance.get('/auth/profile');
                setUser(respone.data);
            }catch(error){
                console.log(error)
            }
        }

        fetchUserData();
    }, []);
    return (
        <>
            <div className='navbar-btn'>
                <button type="button" onClick={toggleSidebar} className="btn-toggle-offcanvas openSidebarButton">
                    <i className="lnr lnr-menu fa fa-bars" />
                </button>
            </div>

            
            <div id="left-sidebar" className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="navbar-brand">
                    <button className='closeSidebarButton' onClick={toggleSidebar}>
                        <img src={ChevronLeft} alt="Go back" /><p>Close</p>
                    </button>
                    <Link to="/">
                    <span>AI Daily</span>
                    </Link>
                    <button
                    type="button"
                    className="btn-toggle-offcanvas btn btn-sm float-right"
                    >
                    <i className="lnr lnr-menu fa fa-chevron-circle-left" />
                    </button>
                </div>
                <div className="sidebar-scroll">
                    <div className="user-account">
                    <div className="user_div">
                        <img
                        src="images/user.png"
                        className="user-photo"
                        alt="User Profile Picture"
                        />
                    </div>
                    <div className="dropdown">

                        <span>Welcome,</span>
                        <div>
            <strong>{user ? user.data.name : "User not found"}</strong>
        </div>

                    </div>
                    </div>
                    <nav id="left-sidebar-nav" className="sidebar-nav">
                    <ul id="main-menu" className="metismenu">
                        <li className="header">Daily Journals</li>
                        <li className="">
                            <Link to="/daily" className="has-arrow">
                                <i className="icon-home" />
                                <span>My Notes</span>
                            </Link>
                            <Link to="/" className="has-arrow">
                                <i className="icon-home" />
                                <span>Ai Reports</span>
                            </Link>
                            {/*<a href="/new-daily.html" className="has-arrow">
                                <i className="icon-plus" />
                                <span>New</span>
                            </a>
                            <ul>
                                <li className="{{ Request::segment(2) === 'index' ? 'active' : null }}">
                                <a href="{{route('mypage.index')}}">04.04.2024</a>
                                </li>
                            </ul>*/}
                        </li>
                    </ul>
                    </nav>
                </div>
            </div>
        </>

    );
}

export default Sidebar;