import { Link } from 'react-router-dom'
import { LoginForm, LoginViewWrapper } from '@/login/components'
import type { LoginFormProps } from '@/login/components/LoginForm'

const SignUp: React.FC<Pick<LoginFormProps, 'onSubmit'>> = ({ onSubmit }) => (
  <LoginViewWrapper>
    <LoginForm 
      title="Join thousands of learners from around the world" 
      description="Master web development by making real-life projects. There are multiple paths for you to choose"
      submitText="Start coding now"
      alternative={<div>
        Already a member? <Link to="/login">Login</Link>
      </div>}
      onSubmit={onSubmit}
    />
  </LoginViewWrapper>
)

export default SignUp
