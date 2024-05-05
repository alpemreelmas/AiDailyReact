import React, { useState, useEffect, useRef } from "react";

export function ProfileDropdown() {
    const [showProfileDropdown, setProfileDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);



    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');

    const handleSubmit = (e:any) => {
        e.preventDefault();
      };


    const toggleModal = () => {
        setShowModal(!showModal)
    }



    const toggleProfileDropdown = () => {
        setProfileDropdown(!showProfileDropdown)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setProfileDropdown(false);
            }
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setShowModal(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef, modalRef]);

    return (
        <div ref={dropdownRef}>
            <button className="dropdown-toggle user-name" onClick={toggleProfileDropdown}>
                <strong>Louis Pierce</strong>
            </button>
            {showProfileDropdown && (
                <ul className="dropdown-menu dropdown-menu-right account vivify flipInY">
                    <li>
                        <a href="{{route('pages.profile')}}">
                        <i className="icon-user" />
                        My Profile
                        </a>
                    </li>


                    <li>
                        <button onClick={toggleModal}>
                        <i className="icon-settings" />
                        Settings
                        </button>
                    </li>


                    <li className="divider" />
                    <li>
                        <a href="{{route('authentication.login')}}">
                        <i className="icon-power" />
                        Logout
                        </a>
                    </li>
                </ul>
            )}
            {showModal && (
                <div className="modal fade default-modal show" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" style={{ display: "block" }} aria-modal="true">
                    <div ref={modalRef} className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="d-flex mb-3">
                                    <div>
                                        <h6 className="mb-0">Settings</h6>
                                    </div>
                                </div>
                                <form className="form-auth-small m-t-20" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="signin-email" className="control-label sr-only">
                                        Email
                                        </label>
                                        <input
                                        type="email"
                                        className="form-control round"
                                        id="signin-email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="New Email"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="signin-password" className="control-label sr-only">
                                        Password
                                        </label>
                                        <input
                                        type="password"
                                        className="form-control round"
                                        id="signin-password"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        placeholder="Old Password"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="signin-password" className="control-label sr-only">
                                        Password
                                        </label>
                                        <input
                                        type="password"
                                        className="form-control round"
                                        id="signin-password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="New Password"
                                        />
                                    </div>
                                </form>
                                <div className="align-right">
                                    <button onClick={toggleModal} className="btn btn-default">
                                        Cancel
                                    </button>
                                    <button type='submit' className="btn btn-success" style={{marginLeft: 10}}>
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfileDropdown;
