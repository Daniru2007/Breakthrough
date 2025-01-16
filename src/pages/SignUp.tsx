import { SignUpForm } from '../components/SignUpForm';
import illustration from '../assets/learn.svg';
import { Link } from 'react-router-dom';

export function SignUp() {
  return (
      <div className="container">
        <div className="signup-container">
          <div className="form-section">
            <h1>Create your profile</h1>
            <SignUpForm/>
            <p className="terms">
              By signing in to BreakThrough, you agree to our{' '}
              <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.
            </p>
          </div>

          <div className="image-section">
            <img src={illustration} alt="Learning illustration"/>
          </div>
        </div>
       <Link to="/sign/login" className="login-btn">LOGIN</Link>
      </div>
  );
}