import React from 'react';
import styled from 'styled-components';
// import { MouseEventHandler } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { EmailInput, PasswordInput, SocialProfileButton } from '@/login/components';
import { CopyrightDeclaration } from '@/common/components';
import type { UserLoginInfo } from '@/login/types';
import type { OAuthProviderName } from '@/login/types';

const ComponentWrapper = styled.div`
  color: #bdbdbd;
`;

const Card = styled.div`
  border: 1px solid;
  border-radius: 24px;
  padding: 53px 58px 43px 58px;
`;

const Centering = styled.div`
  text-align: center;
`;

const ErrorText = styled.div`
  color: red;
`;

export interface LoginFormProps {
  title: string;
  description?: string;
  submitText: string;
  alternative?: React.ReactNode;
  loading?: boolean;
  error?: string;
  onSubmit: SubmitHandler<UserLoginInfo>;
  onSocialSignIn?: (provider: OAuthProviderName) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({
  title,
  description,
  submitText,
  alternative,
  loading,
  error,
  onSubmit,
  onSocialSignIn,
}) => {
  const formMethods = useForm<UserLoginInfo>();
  return (
    <ComponentWrapper>
      <Card>
        {loading && <div>Loading...</div>}
        {error && <ErrorText>{error}</ErrorText>}
        <h3>{title}</h3>
        {description && <p>{description}</p>}
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <EmailInput name="email" />
            <PasswordInput name="password" />
            <input type="submit" value={submitText} />
          </form>
        </FormProvider>
        {onSocialSignIn && (
          <Centering>
            <div>or continue with these social profile</div>
            <div>
              <SocialProfileButton profile="google" onClick={() => onSocialSignIn('google')} />
              <SocialProfileButton profile="github" onClick={() => onSocialSignIn('github')} />
            </div>
            <div>{alternative}</div>
          </Centering>
        )}
      </Card>
      <CopyrightDeclaration />
    </ComponentWrapper>
  );
};

export default LoginForm;
