import styled from 'styled-components'
import { LoginForm } from '@/login/components'
import type { LoginFormProps } from '../components/LoginForm'

const Wrapper = styled.div`
  width: 474px;
  margin: 197px auto;
`

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
  return <Wrapper>
    <LoginForm 
      title="Join thousands of learners from around the world" 
      description="Master web development by making real-life projects. There are multiple paths for you to choose"
      submitText="Start coding now"
      alternative={<div>Already a member? <a href="#">Login</a></div>}
      onSubmit={onSignUp}
    />
  </Wrapper>
}

export default SignUp
