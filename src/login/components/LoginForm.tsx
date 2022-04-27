import React from 'react'
import styled from 'styled-components'
// import { MouseEventHandler } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { EmailInput, PasswordInput } from '@/login/components'
import { CopyrightDeclaration } from '@/common/components'
import type { UserLoginInfo } from '@/login/types'

const ComponentWrapper = styled.div`
  color: #BDBDBD;
`

const Card = styled.div`
  border: 1px solid;
  border-radius: 24px;
  padding: 53px 58px 43px 58px;
`

const Centering = styled.div`
  text-align: center;
`

export interface LoginFormProps {
  title: string,
  description?: string,
  submitText: string,
  alternative?: React.ReactNode,
  onSubmit: SubmitHandler<UserLoginInfo>
}

const LoginForm: React.FC<LoginFormProps> = ({ title, description, submitText, alternative, onSubmit }) => {
  const formMethods = useForm<UserLoginInfo>()
  return <ComponentWrapper>
    <Card>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <EmailInput name="email" />
          <PasswordInput name="password" />
          <input type="submit" value={submitText} />
        </form>
      </FormProvider>
      <Centering>or continue with these social profile</Centering>
      <Centering>SOCIAL PROFILE LOGIN ICONS</Centering>
      <Centering>{alternative}</Centering>
    </Card>
    <CopyrightDeclaration />
  </ComponentWrapper>
}

export default LoginForm