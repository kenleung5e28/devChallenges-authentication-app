import { auth } from './firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from 'firebase/auth'
import type { AuthError } from 'firebase/auth'
import { MouseEventHandler, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

interface UserLoginInfo {
  email: string
  password: string
}

interface FormProps {
  onSubmit: SubmitHandler<UserLoginInfo>
}

interface SignUpFormProps extends FormProps {
  onGoLogin: MouseEventHandler<HTMLAnchorElement>
}

interface LoginFormProps extends FormProps {
  onGoSignUp: MouseEventHandler<HTMLAnchorElement>
}

function SignUpForm({ onSubmit, onGoLogin }: SignUpFormProps) {
  const { register, handleSubmit } = useForm<UserLoginInfo>()
  return <div>
    <h2>Join now</h2>
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
      <input type="submit" value="Register" />
    </form>
    <div>
      Already a member? <a href="#" onClick={onGoLogin}>Login</a>
    </div>
  </div>
}

function LoginForm({ onSubmit, onGoSignUp }: LoginFormProps) {
  const { register, handleSubmit } = useForm<UserLoginInfo>()
  return <div>
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
  </div>
}

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
  const [message, setMessage] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(auth.currentUser)
  const onSignUp: SubmitHandler<UserLoginInfo> = async info => {
    try {
      const credential = await createUserWithEmailAndPassword(auth, info.email, info.password)
      setUser(credential.user)
      setMessage(null)
    } catch (err) {
      setMessage((err as AuthError).message)
    }
  }
  const onLogin: SubmitHandler<UserLoginInfo> = async info => {
    try {
      const credential = await signInWithEmailAndPassword(auth, info.email, info.password)
      setUser(credential.user)
      setMessage(null)
    } catch (err) {
      setMessage((err as AuthError).message)
    }
  }

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
    {pageMode === 'signUp' && <SignUpForm onSubmit={onSignUp} onGoLogin={() => setPageMode('login')} />}
    {pageMode === 'login' && <LoginForm onSubmit={onLogin} onGoSignUp={() => setPageMode('signUp')} />}
    <div style={{color: 'red'}}>
      {message}
    </div>
  </div>

}
