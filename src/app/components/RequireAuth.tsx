import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase'
import React from 'react'

const RequireAuth: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, loading, error] = useAuthState(auth)
  
  if (loading) {
    return <div>
      <h2>Loading...</h2>
    </div>
  }

  if (error) {
    return <div>
      <h2>Oops, some problem occurred!</h2>
      <p>Error: {error.message}</p>
    </div>
  }

  if (!user) {
    // TODO
  }

  return children
}

export default RequireAuth
