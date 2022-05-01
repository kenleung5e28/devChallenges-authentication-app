import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { LoginForm, LoginViewWrapper } from '@/login/components';
import { auth } from '@/firebase';
import { handleSignIn, handleRedirect, isHandlingAuth } from '@/login/utils';
import type { UserLoginInfo } from '@/login/types';
import type { LoginFormProps } from '@/login/components';
import type { OAuthProviderName } from '@/login/types';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

export type CommonLoginProps = Pick<LoginFormProps, 'title' | 'description' | 'submitText' | 'alternative'> & {
  submitAction: 'signUp' | 'login';
};

const CommonLogin: React.FC<CommonLoginProps> = ({ submitAction, ...props }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(isHandlingAuth());
  const [error, setError] = useState<Error | null>(null);
  const onSubmit: SubmitHandler<UserLoginInfo> = async ({ email, password }) => {
    const signInOrCreateUserWithEmailAndPassword =
      submitAction === 'login' ? signInWithEmailAndPassword : createUserWithEmailAndPassword;
    await signInOrCreateUserWithEmailAndPassword(auth, email, password);
  };
  const onSocialSignIn = async (name: OAuthProviderName) => {
    await handleSignIn(name);
  };

  useEffect(() => {
    if (auth.currentUser) {
      navigate('/profile');
    }
    return onAuthStateChanged(auth, async (user) => {
      setLoading(isHandlingAuth());
      try {
        await handleRedirect(navigate);
        setError(null);
      } catch (e) {
        setError(e as Error);
      }
    });
  }, [auth]);

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
