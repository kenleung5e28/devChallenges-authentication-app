import { Link } from 'react-router-dom';
import { CommonLogin } from '@/login/views';

const Login: React.FC = () => (
  <CommonLogin
    title="Login"
    submitText="Login"
    submitAction="login"
    alternative={
      <div>
        Don't have an account yet? <Link to="/">Register</Link>
      </div>
    }
  />
);

export default Login;
