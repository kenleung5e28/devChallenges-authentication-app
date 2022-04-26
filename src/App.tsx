import { auth } from './firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth'
import type { AuthError } from 'firebase/auth'
import { MouseEventHandler, useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import SignUp from '@/login/views/SignUp'

/*
interface LoginFormProps {
  onSubmit: SubmitHandler<UserLoginInfo>
  onGoSignUp: MouseEventHandler<HTMLAnchorElement>
}

function LoginForm({ onSubmit, onGoSignUp }: LoginFormProps) {
  const { register, handleSubmit } = useForm<UserLoginInfo>()
  return <LoginForm>
    <h2>Login</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">E-mail</label>
      <input {...register('email', {
        required: true,
        pattern: EMAIL_REGEX,
      })} />
      <label htmlFor="password">Password</label>
      <input type="password" {...register('password', {
        required: true,
        minLength: 8,
      })} />
      <input type="submit" value="Login" />
    </form>
    <div>
      Don't have an account yet? <a href="#" onClick={onGoSignUp}>Register</a>
    </div>
  </LoginForm>
}
*/

interface UserInfoDisplayProps {
  displayName: string | null,
  email: string | null,
  photoURL: string | null,
}

function UserInfoDisplay({ displayName, email, photoURL } : UserInfoDisplayProps) {
  return <div>
    <h3>{displayName ?? 'N/A'}{email ? `<${email}>`: ''}</h3>
    {photoURL && <img src={photoURL}></img>}
  </div>
}

export default function App() {
  const [pageMode, setPageMode] = useState<'signUp' | 'login'>('signUp')
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<User | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  // const onLogin: SubmitHandler<UserLoginInfo> = async info => {
  //   try {
  //     setLoading(true)
  //     const credential = await signInWithEmailAndPassword(auth, info.email, info.password)
  //     setUser(credential.user)
  //     setMessage(null)
  //   } catch (err) {
  //     setMessage((err as AuthError).message)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  useEffect(() => onAuthStateChanged(auth, user => {
    setUser(user)
    setLoading(false)
  }), [auth])

  if (user) {
    return <div>
      <h1>Welcome!</h1>
      <UserInfoDisplay {...user} />
      <div>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  }

  return <div>
    {pageMode === 'signUp' && <SignUp />}
    {/* pageMode === 'login' && <LoginForm onSubmit={onLogin} onGoSignUp={() => setPageMode('signUp')} /> */}
    <div style={{color: 'red'}}>
      {message}
    </div>
    <div>{loading ? 'Loading...' : ''}</div>
  </div>

}
