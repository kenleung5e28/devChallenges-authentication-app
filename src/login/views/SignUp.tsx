import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { LoginForm, LoginViewWrapper } from '@/login/components';
import { auth } from '@/firebase';
import type { UserLoginInfo } from '@/login/types';

const SignUp: React.FC = () => {
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const onSubmit: SubmitHandler<UserLoginInfo> = async ({ email, password }) => {
    await createUserWithEmailAndPassword(email, password);
  };
  const onSocialSignIn = (provider) => {};

  if (!loading && !error && user) {
    return <Navigate to="/profile" />;
  }

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
        loading={loading}
        error={error && `Failed to register: ${error.message}`}
        onSubmit={onSubmit}
        onSocialSignIn={onSocialSignIn}
      />
    </LoginViewWrapper>
  );
};

export default SignUp;
