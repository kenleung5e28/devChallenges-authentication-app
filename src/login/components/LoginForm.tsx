import React from 'react'
import styled from 'styled-components'
import { MouseEventHandler } from 'react'
import { useForm, SubmitHandler, UseFormRegister } from 'react-hook-form'
import { TextInput } from '@/login/components'
import { CopyrightDeclaration } from '@/common/components'
import type { UserLoginInfo } from '@/login/types'

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const ComponentWrapper = styled.div`
  color: #BDBDBD;
`

const Card = styled.div`
  border: 1px solid;
  border-radius: 24px;
  padding: 53px 58px 43px 58px;
`

const CenterWrapper = styled.div`
  text-align: center;
`

const EmailInput = React.forwardRef<
  ReturnType<UseFormRegister<UserLoginInfo>>
>(() => (
  <TextInput label="Email" />
))

const PasswordInput = React.forwardRef<
ReturnType<UseFormRegister<UserLoginInfo>>
>(() => (
  <TextInput label="Password" isPassword />
))


export interface LoginFormProps {
  title: string,
  description?: string,
  submitText: string,
  alternative?: React.ReactNode,
  onSubmit: SubmitHandler<UserLoginInfo>
}

const LoginForm: React.FC<LoginFormProps> = ({ title, description, submitText, alternative, onSubmit }) => {
  const { register, handleSubmit } = useForm<UserLoginInfo>()
  return <ComponentWrapper>
    <Card>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <EmailInput {...register('email', {
          required: true,
          pattern: EMAIL_REGEX,
        })} />
        <PasswordInput {...register('password', {
          required: true,
          minLength: 8,
        })} />
        <input type="submit" value={submitText} />
      </form>
      <CenterWrapper>or continue with these social profile</CenterWrapper>
      <CenterWrapper>SOCIAL PROFILE LOGIN ICONS</CenterWrapper>
      {alternative}
    </Card>
    <CopyrightDeclaration />
  </ComponentWrapper>
}

export default LoginForm