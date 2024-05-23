import {Link } from 'react-router-dom';
import Alert from "../../components/alert.jsx";
import Button from "../../components/ui/buttonElement.jsx";
import InputWithLabel from "../../components/ui/inputWithLabel.jsx";
import useRegister from "../../hooks/auth/useRegister.js";

function Register() {

  const {
    email,
    setEmail,
    password,
    setPassword,
    verifyPassword,
    setVerifyPassword,
    name,
    setName,
    errors,
    handleRegisterSubmit
  } = useRegister();

  return (
    <div className="auth-main particles_js">
      <div className="auth_div vivify popIn">
        <div className="auth_brand">
            AI Daily
        </div>
        <div className="card">
          <div className="body">
            <p className="lead">Create an account</p>

            {errors?.length > 0 && (<Alert messages={errors} type={"warning"} />)}
            <form className="form-auth-small m-t-20" onSubmit={handleRegisterSubmit}>
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
                <InputWithLabel type='password' label='Verify Password' id='password' value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} placeholder='Verify Password' />
              </div>
              <Button type='submit' kind='primary btn-round btn-block' content='Register' />
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
