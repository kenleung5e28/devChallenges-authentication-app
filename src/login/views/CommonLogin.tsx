import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LoginForm, LoginViewWrapper } from '@/login/components';
import { auth } from '@/firebase';
import { handleSignIn, handleRedirect } from '@/login/utils';
import type { UserLoginInfo } from '@/login/types';
import type { LoginFormProps } from '@/login/components';
import type { OAuthProviderName } from '@/login/types';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithRedirect,
  User,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

export type CommonLoginProps = Pick<LoginFormProps, 'title' | 'description' | 'submitText' | 'alternative'> & {
  submitAction: 'signUp' | 'login';
};

const CommonLogin: React.FC<CommonLoginProps> = ({ submitAction, ...props }) => {
  const naviagate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const onSubmit: SubmitHandler<UserLoginInfo> = async ({ email, password }) => {
    const signInOrCreateUserWithEmailAndPassword =
      submitAction === 'login' ? signInWithEmailAndPassword : createUserWithEmailAndPassword;
    await signInOrCreateUserWithEmailAndPassword(auth, email, password);
  };
  const onSocialSignIn = async (name: OAuthProviderName) => {
    await handleSignIn(name);
  };

  useEffect(
    () =>
      onAuthStateChanged(auth, async () => {
        await handleRedirect(naviagate);
      }),
    []
  );

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
