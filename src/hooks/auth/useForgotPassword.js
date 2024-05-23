import {useState} from "react";
import {forgotPasswordSchema} from "../../schemas/forgotPasswordSchema.js";
import axiosInstance from "../../lib/axiosInstance.js";
import {toast} from "react-toastify";
import {ZodError} from "zod";
import {FORGOT_PASSWORD_URL} from "../../constants/routeConstants.js";
import {ctoast} from "../../lib/utils.js";

const useForgotPassword = ()=>{

    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState();

    const handleForgotPasswordSubmit = async (e) => {
        e.preventDefault();
        setErrors(null)
        try {
            const validated= await forgotPasswordSchema.parseAsync({email})
            const response = await axiosInstance.post(FORGOT_PASSWORD_URL,validated)
            if(!response.data.is_error && response.status === 201){
                ctoast("The password reset link has been successfully sent to your email",{type:"success"})
            }
        }catch (e) {
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
        errors,
        handleForgotPasswordSubmit
    }
}

export default useForgotPassword;