import { LoginForm } from '@/login/components'
import type { LoginFormProps } from '../components/LoginForm'


const SignUp: React.FC = () => {
  const onSignUp: LoginFormProps['onSubmit'] = async info => {
    // try {
    //   setLoading(true)
    //   const credential = await createUserWithEmailAndPassword(auth, info.email, info.password)
    //   setUser(credential.user)
    //   setMessage(null)
    // } catch (err) {
    //   setMessage((err as AuthError).message)
    // } finally {
    //   setLoading(false)
    // }
  }
  return <div>
    <LoginForm 
      title="Sign Up" 
      description="Blah blah blah..."
      submitText="Register"
      alternative={<div>Already a member? <a href="#">Login</a></div>}
      onSubmit={onSignUp}
    />
  </div>
}

export default SignUp
