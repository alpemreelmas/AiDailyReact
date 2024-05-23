import Alert from "../../components/alert.jsx";
import Button from "../../components/ui/buttonElement.jsx";
import InputWithLabel from "../../components/ui/inputWithLabel.jsx";
import BackButton from '../../components/ui/backButton.jsx';
import useForgotPassword from "../../hooks/auth/useForgotPassword.js";



function ForgotPassword() {

  const { email, setEmail, errors, handleForgotPasswordSubmit } = useForgotPassword()

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

            <form className="form-auth-small m-t-20" onSubmit={handleForgotPasswordSubmit}>
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
