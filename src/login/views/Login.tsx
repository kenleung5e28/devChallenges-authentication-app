import { Link } from 'react-router-dom'
import { LoginForm, LoginViewWrapper } from '@/login/components'
import type { LoginFormProps } from '@/login/components/LoginForm'

const Login: React.FC<Pick<LoginFormProps, 'onSubmit'>> = ({ onSubmit }) => (
  <LoginViewWrapper>
    <LoginForm 
      title="Login" 
      submitText="Login"
      alternative={<div>
        Don't have an account yet? <Link to="/">Register</Link>
      </div>}
      onSubmit={onSubmit}
    />
  </LoginViewWrapper>
)

export default Login
