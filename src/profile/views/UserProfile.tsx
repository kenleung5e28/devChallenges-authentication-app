import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';
import { signOut } from 'firebase/auth';

const UserProfile: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);

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
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <h3>
        {user?.displayName ?? 'N/A'}
        {user?.email ? `<${user.email}>` : ''}
      </h3>
      <div>{user?.photoURL && <img src={user.photoURL}></img>}</div>
      <a href="#" onClick={() => signOut(auth)}>
        Sign out
      </a>
    </div>
  );
};

export default UserProfile;
