import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Alert({ messages, type }) {
    useEffect(() => {
        
        if (Array.isArray(messages)) {
            messages.forEach(message => {
                toast[type](message);
            });
        } else {
            
            toast[type](messages);
        }
    }, [messages]);

    return <ToastContainer /> ;
}

export default Alert;
