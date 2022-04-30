import { Link } from 'react-router-dom';
import { CommonLogin } from '@/login/views';

const SignUp: React.FC = () => (
  <CommonLogin
    title="Join thousands of learners from around the world"
    description="Master web development by making real-life projects. There are multiple paths for you to choose"
    submitText="Start coding now"
    submitAction="signUp"
    alternative={
      <div>
        Already a member? <Link to="/login">Login</Link>
      </div>
    }
  />
);

export default SignUp;
