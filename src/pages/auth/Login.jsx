import { Link } from 'react-router-dom';
import Alert from "../../components/alert.jsx";
import Button from "../../components/ui/buttonElement.jsx";
import InputWithLabel from "../../components/ui/inputWithLabel.jsx";
import useLogin from "../../hooks/auth/useLogin.js";


function Login() {

  const {errors,
    handleLoginSubmit,
    email,
    setEmail,
    password,
    setPassword } = useLogin();

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

            <form className="form-auth-small m-t-20" onSubmit={handleLoginSubmit}>
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
                <div className='forgotPassword' style={{textAlign: 'center'}}>
                  <span>Did you forget your password ? <Link to="/forgot-password">Reset Now</Link></span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
