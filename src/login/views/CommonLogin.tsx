import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirebaseError | null>(null);
  const onSubmit: SubmitHandler<UserLoginInfo> = async ({ email, password }) => {
    try {
      setLoading(true);
      setError(null);
      const signInOrCreateUserWithEmailAndPassword =
        submitAction === 'login' ? signInWithEmailAndPassword : createUserWithEmailAndPassword;
      await signInOrCreateUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error as FirebaseError);
      setLoading(false);
    }
  };
  const onSocialSignIn = async (provider: OAuthProviderName) => {
    try {
      setLoading(true);
      setError(null);
      await signInByOAuth(provider);
    } catch (error) {
      setLoading(false);
      setError(error as FirebaseError);
    }
  };

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          naviagate('/profile');
        }
      }),
    []
  );

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
