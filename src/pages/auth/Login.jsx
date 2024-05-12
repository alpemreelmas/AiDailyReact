import { useState} from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from "../../lib/axiosInstance.js";
import {ZodError} from "zod";
import {loginSchema} from "../../schemas/loginSchema.js";
import Alert from "../../components/alert.jsx";
import {useAuth} from "../../hooks/useAuth.jsx";
import {LOGIN_URL} from "../../constants/routeConstants.js";
import Button from "../../components/ui/buttonElement.jsx";
import InputWithLabel from "../../components/ui/inputWithLabel.jsx";


function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null)
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
        toast(e.response.data.message)
      }
    }

  };

  return (
    <div className="auth-main particles_js">
      <div className="auth_div vivify popIn">
        <div className="auth_brand">
          <a className="navbar-brand" href="javascript:void(0);">
            AI Daily
          </a>
        </div>
        <div className="card">
          <div className="body">
            <p className="lead">Login to your account</p>

            <form className="form-auth-small m-t-20" onSubmit={handleSubmit}>
              {errors?.length > 0 && (<Alert messages={errors} type={"danger"} />)}
              <div className="form-group">
                <InputWithLabel type='email' label='Email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
              </div>
              <div className="form-group">
                <InputWithLabel type='password' label='Password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
              </div>
              <Button type='submit' kind='primary btn-round btn-block' content='Login' />

              <div className="bottom">
                <span>
                  Don't have an account? <Link to="/register">Register</Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
