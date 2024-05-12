import { useState} from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from "../../lib/axiosInstance.js";
import {ZodError} from "zod";
import Alert from "../../components/alert.jsx";
import Button from "../../components/ui/buttonElement.jsx";
import InputWithLabel from "../../components/ui/inputWithLabel.jsx";
import { forgotPasswordSchema } from '../../schemas/forgotPasswordSchema.js';
import { toast } from 'react-toastify';
import BackButton from '../../components/ui/backButton.jsx';



function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null)
    try {
      const validated= await forgotPasswordSchema.parseAsync({email})
      const response = await axiosInstance.post('/reset-password',validated)
      
      if(!response.data.is_error && response.status === 200){
        toast(response.data.data)
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
            <BackButton />
            <p className="lead" style={{marginTop: 30}}>Send reset password email</p>

            <form className="form-auth-small m-t-20" onSubmit={handleSubmit}>
              {errors?.length > 0 && (<Alert messages={errors} type={"danger"} />)}
              <div className="form-group">
                <InputWithLabel type='email' label='Email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
              </div>
              <Button type='submit' kind='primary btn-round btn-block' content='Send' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
