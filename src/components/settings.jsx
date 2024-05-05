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
                    <h6 className="mb-0">Application Settings</h6>
                </div>
            </div>
            <form className="form-auth-small m-t-20" onSubmit={handleSubmit}>
                Application settings
            </form>
        </ModalComponent>
    );
}

export default Settings;