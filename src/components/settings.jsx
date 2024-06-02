import React, { useState, useEffect } from 'react';
import axiosInstance from '../lib/axiosInstance.js';
import ModalComponent from './modal-component.jsx';
import InputWithLabel from './ui/inputWithLabel.jsx';
import { updateProfileSchema } from '../schemas/updateProfileSchema.js';
import { ZodError } from 'zod';
import { toast } from 'react-toastify';
import Button from './ui/buttonElement.jsx';
import { AUTH_KEY} from "../constants/appConstants.js";

function Settings() {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');

    const toastOption = {
        theme: 'dark'
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get('/auth/profile');
                setUser(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(null);
        try {
            const validated = await updateProfileSchema.parseAsync({ name, password });
            const response = await axiosInstance.post('/auth/profile', validated);
            if (!response.data.is_error && response.status === 200) {
                toast.success('Informations updated successfully', toastOption);
                const updateEvent = new CustomEvent('userUpdated', { detail: { user: response.data } });
                window.dispatchEvent(updateEvent);
            }
        } catch (e) {
            if (e instanceof ZodError) {
                const messages = [];
                e.errors.forEach(obj => messages.push(obj.message));
                setErrors(messages);
            }
            if (e.response?.data.is_error) {
                setErrors(Array.isArray(e.response.data.message) ? e.response.data.message : [e.response.data.message]);
            }
        }
    };

    const handleResendVerificationEmail = async (e) => {
        e.preventDefault();
        setErrors(null);
        try {
            const userData = JSON.parse(window.localStorage.getItem(AUTH_KEY));
            const response = await axiosInstance.post('/auth/resend-verification', { email: userData.email });
            if (!response.data.is_error && response.status === 200) {
                toast.success('Verification email successfully sent', toastOption);
                
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className="form-auth-small m-t-20" onSubmit={handleSubmit} style={{padding: 15}}>
            <div className="form-group">
                <InputWithLabel type='text' label='Name' id='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
            </div>
            <div className="form-group">
                <InputWithLabel type='password' label='Password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
            </div>

            <div className="buttons" style={{display: 'flex', justifyContent: 'space-between'}}>
                {user?.data?.verificationToken !== null && (
                    <Button
                        type='button'
                        kind='success'
                        content='Resend verification email'
                        onClick={handleResendVerificationEmail}
                    />
                )}
                <Button type='submit' kind='success' content='Confirm' style={{ marginLeft: 10 }} />
            </div>
        </form>
    );
}

export default Settings;
