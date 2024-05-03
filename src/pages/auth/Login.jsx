import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from "../../lib/axiosInstance.js";
import {ZodError} from "zod";
import {loginSchema} from "../../schemas/loginSchema.js";
import Alert from "../../components/alert.jsx";
import {useAuth} from "../../hooks/useAuth.jsx";

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
      const response = await axiosInstance.post("/auth/login",validated)
      if(!response.data.is_error && response.status == 200){
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
                <label htmlFor="signin-email" className="control-label sr-only">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control round"
                  id="signin-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <div className="form-group clearfix">
                <label className="fancy-checkbox element-left">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
              </div>
              <button type="submit" className="btn btn-primary btn-round btn-block">
                LOGIN
              </button>
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
