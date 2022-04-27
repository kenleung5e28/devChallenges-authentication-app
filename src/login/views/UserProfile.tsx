export interface UserProfileProps {
  displayName: string | null,
  email: string | null,
  photoURL: string | null,
}

const UserProfile: React.FC<UserProfileProps> = ({ displayName, email, photoURL }) => (
  <div>
    <h3>{displayName ?? 'N/A'}{email ? `<${email}>`: ''}</h3>
    {photoURL && <img src={photoURL}></img>}
  </div>
)

export default UserProfile
