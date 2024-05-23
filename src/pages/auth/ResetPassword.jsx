import Alert from "../../components/alert.jsx";
import Button from "../../components/ui/buttonElement.jsx";
import InputWithLabel from "../../components/ui/inputWithLabel.jsx";
import useResetPassword from "../../hooks/auth/useResetPassword.js";



function ResetPassword() {

  const {
    email,
    setEmail,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    handleResetPasswordSubmit,
    errors
  } = useResetPassword()

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

            <form className="form-auth-small m-t-20" onSubmit={handleResetPasswordSubmit}>
              {errors?.length > 0 && (<Alert messages={errors} type={"danger"} />)}
              <div className="form-group">
                <InputWithLabel type='email' label='Email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
              </div>
              <div className="form-group">
                <InputWithLabel type='password' label='New Password' id='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='New Password' />
              </div>
              <div className="form-group">
                <InputWithLabel type='password' label='Confirmation New Password' id='conf_password' value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)} placeholder='Confirmation New Password' />
              </div>
              <Button type='submit' kind='primary btn-round btn-block' content='Send' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
