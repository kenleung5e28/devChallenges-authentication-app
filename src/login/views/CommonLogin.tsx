import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LoginForm, LoginViewWrapper } from '@/login/components';
import { auth } from '@/firebase';
import { signInByOAuth } from '@/auth';
import type { UserLoginInfo } from '@/login/types';
import type { LoginFormProps } from '@/login/components';
import type { OAuthProviderName } from '@/auth';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, User } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

export type CommonLoginProps = Pick<LoginFormProps, 'title' | 'description' | 'submitText' | 'alternative'> & {
  submitAction: 'signUp' | 'login';
};

const CommonLogin: React.FC<CommonLoginProps> = ({ submitAction, ...props }) => {
  const naviagate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const onSubmit: SubmitHandler<UserLoginInfo> = async ({ email, password }) => {
    try {
      const signInOrCreateUserWithEmailAndPassword =
        submitAction === 'login' ? signInWithEmailAndPassword : createUserWithEmailAndPassword;
      await signInOrCreateUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      // setError(error as FirebaseError);
    }
  };
  const onSocialSignIn = async (provider: OAuthProviderName) => {
    try {
      await signInByOAuth(provider);
    } catch (error) {
      // setError(error as FirebaseError);
    }
  };

  useEffect(() => {
    if (user) {
      naviagate('/profile');
    }
  }, [user]);

  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <LoginViewWrapper>
      <LoginForm
        {...props}
        loading={loading}
        error={error?.message}
        onSubmit={onSubmit}
        onSocialSignIn={onSocialSignIn}
      />
    </LoginViewWrapper>
  );
};

export default CommonLogin;
