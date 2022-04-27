import styled from 'styled-components'
import { LoginForm } from '@/login/components'
import type { LoginFormProps } from '../components/LoginForm'

const Wrapper = styled.div`
  width: 474px;
  margin: 197px auto;
`

const Login: React.FC<Pick<LoginFormProps, 'onSubmit'>> = ({ onSubmit }) => (
  <Wrapper>
    <LoginForm 
      title="Login" 
      submitText="Login"
      alternative={<div>Don't have an account yet? <a href="#">Register</a></div>}
      onSubmit={onSubmit}
    />
  </Wrapper>
)

export default Login
