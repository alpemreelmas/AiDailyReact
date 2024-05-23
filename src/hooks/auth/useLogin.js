import {loginSchema} from "../../schemas/loginSchema.js";
import axiosInstance from "../../lib/axiosInstance.js";
import {LOGIN_URL} from "../../constants/routeConstants.js";
import {ZodError} from "zod";
import {ctoast} from "../../lib/utils.js";
import {useState} from "react";
import {useAuth} from "../useAuth.jsx";

const useLogin = ()=>{
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors,setErrors] = useState()


    async function handleLoginSubmit(e) {
        e.preventDefault();
        setErrors(null)
        await loginApi(email,password)
    }

    async function loginApi(){
        try {
            const validated= await loginSchema.parseAsync({email,password})
            const response = await axiosInstance.post(LOGIN_URL,validated)
            if(!response.data.is_error && response.status === 200){
                login(response.data.data)
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
    }

    return {
        errors,
        handleLoginSubmit,
        email,
        setEmail,
        password,
        setPassword
    }
}

export default useLogin;