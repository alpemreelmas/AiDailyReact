import {useState} from "react";
import {registerSchema} from "../../schemas/registerSchema.js";
import axiosInstance from "../../lib/axiosInstance.js";
import {ZodError} from "zod";
import {REGISTER_URL} from "../../constants/routeConstants.js";
import {useAuth} from "../useAuth.jsx";

const useRegister = () =>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [errors, setErrors] = useState();
    const { login } = useAuth();

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setErrors(null)
        try {
            const validated= await registerSchema.parseAsync({email,password,name,passwordConfirmation: verifyPassword})
            const response = await axiosInstance.post(REGISTER_URL,validated)
            if(!response.data.is_error && response.status === 201){
                login(response.data.data)
            }
        }catch (e) {
            if(e instanceof ZodError){
                var messages = [];
                e.errors.map(obj => messages.push(obj.message))
                setErrors(messages)
            }
            if(e.response.data.is_error){
                setErrors(Array.isArray(e.response.data.message) ? e.response.data.message : [e.response.data.message])
            }
        }

    };

    return {
        name, setName,
        email, setEmail,
        password, setPassword,
        verifyPassword, setVerifyPassword,
        errors,
        handleRegisterSubmit
    }

}

export default useRegister;