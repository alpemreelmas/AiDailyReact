import React, { useState } from 'react';
import ModalComponent from "./modal-component.jsx";

function Settings() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
      };

    return (
        <ModalComponent>
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
        </ModalComponent>
    );
}

export default Settings;