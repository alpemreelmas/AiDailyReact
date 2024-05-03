import { useLocation } from 'react-router-dom';
import Settings from '../settings.jsx';

function Header() {

    const location = useLocation();

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
                <div className="navbar-btn">
                    <button type="button" className="btn-toggle-offcanvas">
                    <i className="lnr lnr-menu fa fa-bars" />
                    </button>
                </div>
                <h4 style={{ margin: "0 !important" }}>{title}</h4>
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
                        <Settings />
                    </li>
                    </ul>
                </div>
                </div>
            </div>
            <div className="progress-container">
                <div className="progress-bar" id="myBar" />
            </div>
        </nav>
    );
}

export default Header;