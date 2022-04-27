import { MouseEventHandler, useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { auth } from './firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth'
import type { AuthError } from 'firebase/auth'
import { SignUp, Login, UserProfile } from '@/login/views'

export default function App() {
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

  // if (user) {
  //   return <div>
  //     <h1>Welcome!</h1>
  //     <div>
  //       <button onClick={() => signOut(auth)}>Logout</button>
  //     </div>
  //   </div>
  // }

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

  return <div>
    <div>{loading ? 'Loading...' : ''}</div>
    <Routes>
      <Route path="/" element={<SignUp onSubmit={data => console.log(data)} />} />
      <Route path="/login" element={<Login onSubmit={data => console.log(data)} />} />
      <Route path="/profile" element={<UserProfile />} />
    </Routes>
  </div>

}
