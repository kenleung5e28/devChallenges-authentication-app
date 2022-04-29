import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { LoginForm, LoginViewWrapper } from '@/login/components';
import { UserLoginInfo } from '@/login/types';
import { auth } from '@/firebase';

const Login: React.FC = () => {
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const onSubmit: SubmitHandler<UserLoginInfo> = async ({ email, password }) => {
    await signInWithEmailAndPassword(email, password);
  };
  const onSocialSignIn = (provider) => {};

  if (!loading && !error && user) {
    return <Navigate to="/profile" />;
  }

  return (
    <LoginViewWrapper>
      <LoginForm
        title="Login"
        submitText="Login"
        alternative={
          <div>
            Don't have an account yet? <Link to="/">Register</Link>
          </div>
        }
        loading={loading}
        error={error && `Login failed: ${error.message}`}
        onSubmit={onSubmit}
        onSocialSignIn={onSocialSignIn}
      />
    </LoginViewWrapper>
  );
};

export default Login;
