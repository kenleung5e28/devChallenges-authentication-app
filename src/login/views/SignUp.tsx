import styled from 'styled-components'
import { LoginForm } from '@/login/components'
import type { LoginFormProps } from '../components/LoginForm'

const Wrapper = styled.div`
  width: 474px;
  margin: 197px auto;
`

const SignUp: React.FC<Pick<LoginFormProps, 'onSubmit'>> = ({ onSubmit }) => (
  <Wrapper>
    <LoginForm 
      title="Join thousands of learners from around the world" 
      description="Master web development by making real-life projects. There are multiple paths for you to choose"
      submitText="Start coding now"
      alternative={<div>Already a member? <a href="#">Login</a></div>}
      onSubmit={onSubmit}
    />
  </Wrapper>
)

export default SignUp
