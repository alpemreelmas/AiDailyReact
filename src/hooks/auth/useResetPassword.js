import {useState} from "react";
import {redirect, useNavigate, useSearchParams} from "react-router-dom";
import {resetPasswordSchema} from "../../schemas/resetPasswordSchema.js";
import axiosInstance from "../../lib/axiosInstance.js";
import {toast} from "react-toastify";
import {ZodError} from "zod";
import {generateResetPasswordUrl} from "../../lib/services/authService.js";
import {ctoast} from "../../lib/utils.js";

const useResetPassword = ()=>{
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errors, setErrors] = useState();
    let [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const handleResetPasswordSubmit = async (e) => {
        e.preventDefault();
        if(!searchParams.has("token")){
            redirect("/forgot-password");
        }
        setErrors(null)
        try {
            const validated= await resetPasswordSchema.parseAsync({email, newPassword, confirmNewPassword})
            const response = await axiosInstance.post(generateResetPasswordUrl(searchParams.get("token")),validated)
            console.log(response)
            if(!response.data.is_error && response.status === 200){
                ctoast('Your password successfully changed',{type:"success"});
                navigate('/login')
            }
        }catch (e) {
            console.log(e.response)
            if(e instanceof ZodError){
                var messages = [];
                e.errors.map(obj => messages.push(obj.message))
                setErrors(messages)
            }
            if(e.response?.data.is_error){
                ctoast(e.response.data.message,{type:"error"})
            }
        }

    };

    return {
        email,
        setEmail,
        newPassword,
        setNewPassword,
        confirmNewPassword,
        setConfirmNewPassword,
        handleResetPasswordSubmit,
        errors
    }
}

export default useResetPassword;