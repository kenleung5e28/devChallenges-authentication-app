import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';
import React from 'react';

const RequireAuth: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>Oops! Some problem occurred.</h2>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
