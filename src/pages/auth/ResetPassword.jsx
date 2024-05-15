import { useState} from 'react';
import { Navigate } from 'react-router-dom';
import axiosInstance from "../../lib/axiosInstance.js";
import {ZodError} from "zod";
import Alert from "../../components/alert.jsx";
import Button from "../../components/ui/buttonElement.jsx";
import InputWithLabel from "../../components/ui/inputWithLabel.jsx";
import { toast } from 'react-toastify';
import { resetPasswordSchema } from '../../schemas/resetPasswordSchema.js';



function ResetPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errors, setErrors] = useState();
  const token = new URLSearchParams(window.location.search).get('token');
  
  const toastOption = {
    theme: "dark"
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null)
    try {
      const validated= await resetPasswordSchema.parseAsync({email, newPassword, token})
      const response = await axiosInstance.post('/reset-password/reset',validated)
      if(!response.data.is_error && response.status === 200){
        console.log('password successfully changed')
      }
    }catch (e) {
      if(e instanceof ZodError){
        var messages = [];
        e.errors.map(obj => messages.push(obj.message))
        setErrors(messages)
      }
      if(e.response?.data.is_error){
        toast.error(e.response.data.message, toastOption)
      }
    }

  };




  return (
    <div className="auth-main particles_js">
      <div className="auth_div vivify popIn">
        <div className="auth_brand">
          <a className="navbar-brand">
            AI Daily
          </a>
        </div>
        <div className="card">
          <div className="body">
            <p className="lead">Change your password</p>

            <form className="form-auth-small m-t-20" onSubmit={handleSubmit}>
              {errors?.length > 0 && (<Alert messages={errors} type={"danger"} />)}
              <div className="form-group">
                <InputWithLabel type='email' label='Email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
              </div>
              <div className="form-group">
                <InputWithLabel type='password' label='New Password' id='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='New Password' />
              </div>
              <input type="hidden" name="token" value={token} />
              <Button type='submit' kind='primary btn-round btn-block' content='Send' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
