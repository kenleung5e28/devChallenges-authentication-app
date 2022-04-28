import { Link } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { LoginForm, LoginViewWrapper } from '@/login/components';
import { UserLoginInfo } from '@/login/types';
import { auth } from '@/firebase';

const Login: React.FC = () => {
  const [signInWithEmailAndPassword, _, loading, error] = useSignInWithEmailAndPassword(auth);
  const onSubmit: SubmitHandler<UserLoginInfo> = async ({ email, password }) => {
    await signInWithEmailAndPassword(email, password);
  };

  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <LoginViewWrapper>
      {error && <div>Error: {error.message}</div>}
      <LoginForm
        title="Login"
        submitText="Login"
        alternative={
          <div>
            Don't have an account yet? <Link to="/">Register</Link>
          </div>
        }
        onSubmit={onSubmit}
      />
    </LoginViewWrapper>
  );
};

export default Login;
