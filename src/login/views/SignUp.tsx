import { Link } from 'react-router-dom';
import { LoginForm, LoginViewWrapper } from '@/login/components';

const SignUp: React.FC = () => {
  return (
    <LoginViewWrapper>
      <LoginForm
        title="Join thousands of learners from around the world"
        description="Master web development by making real-life projects. There are multiple paths for you to choose"
        submitText="Start coding now"
        alternative={
          <div>
            Already a member? <Link to="/login">Login</Link>
          </div>
        }
        onSubmit={() => {}}
      />
    </LoginViewWrapper>
  );
};

export default SignUp;
