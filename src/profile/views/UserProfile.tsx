import { auth } from '@/firebase';
import { signOut } from 'firebase/auth';

const UserProfile: React.FC = () => {
  const user = auth.currentUser;
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
