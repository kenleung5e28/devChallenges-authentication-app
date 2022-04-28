import { MouseEventHandler, useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth'
import type { AuthError } from 'firebase/auth'
import { auth } from '@/firebase'
import { RequireAuth } from '@/app/components'
import { SignUp, Login } from '@/login/views'
import { UserProfile } from '@/profile/views'

export default function App() {
  return <div>
    <Routes>
      <Route path="/" element={<SignUp onSubmit={data => console.log(data)} />} />
      <Route path="/login" element={<Login onSubmit={data => console.log(data)} />} />
      <Route path="/profile" element={
        <RequireAuth>
          <UserProfile />
        </RequireAuth>
      } />
    </Routes>
  </div>

}
