import { Routes, Route } from 'react-router-dom';
import { RequireAuth } from '@/app/components';
import { SignUp, Login } from '@/login/views';
import { UserProfile } from '@/profile/views';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <UserProfile />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}
