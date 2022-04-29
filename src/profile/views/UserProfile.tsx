import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';

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
      {user?.photoURL && <img src={user.photoURL}></img>}
    </div>
  );
};

export default UserProfile;
