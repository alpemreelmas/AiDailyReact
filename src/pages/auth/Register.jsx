import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {loginSchema} from "../../schemas/loginSchema.js";
import axiosInstance from "../../lib/axiosInstance.js";
import {ZodError} from "zod";
import Alert from "../../components/alert.jsx";
import {registerSchema} from "../../schemas/registerSchema.js";
import Button from "../../components/items/buttonElement.jsx";
import InputWithLabel from "../../components/items/inputWithLabel";

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [errors, setErrors] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null)
    try {
      const validated= await registerSchema.parseAsync({email,password,name,passwordConfirmation: verifyPassword})
      const response = await axiosInstance.post("/auth/register",validated)
      if(!response.data.is_error && response.status == 201){
        console.log(response.data)
        /*navigate('/notes');*/
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
      {errors?.length > 0 && (<Alert messages={errors} type={"warning"} />)}
      <div className="auth_div vivify popIn">
        <div className="auth_brand">
            AI Daily
        </div>
        <div className="card">
          <div className="body">
            <p className="lead">Create an account</p>
            <form className="form-auth-small m-t-20" onSubmit={handleSubmit}>
              <div className="form-group">
                <InputWithLabel type='text' label='Your name' id='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Your Name' />
              </div>
              <div className="form-group">
                <InputWithLabel type='email' label='Your email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Your email' />
              </div>
              <div className="form-group">
                <InputWithLabel type='password' label='Password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
              </div>
              <div className="form-group">
                <input
                    type="password"
                    className="form-control round"
                    placeholder="Verify Password"
                    value={verifyPassword}
                    onChange={(e) => setVerifyPassword(e.target.value)}
                />
                <InputWithLabel type='password' label='Verify Password' id='password' value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} placeholder='Verify Password' />
              </div>
              <Button type='submit' kind='prymary btn-round btn-block' content='Register' />
              <div className="bottom">
                <span>
                  Do you have an account? <Link to="/login">Login</Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
