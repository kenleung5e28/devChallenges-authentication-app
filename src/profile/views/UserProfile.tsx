import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';

const UserProfile: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <div>
      <h3>
        {displayName ?? 'N/A'}
        {email ? `<${email}>` : ''}
      </h3>
      {photoURL && <img src={photoURL}></img>}
    </div>
  );
};

export default UserProfile;
