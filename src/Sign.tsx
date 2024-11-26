import './Sign.css';
import { Routes, Route } from 'react-router-dom';
import { SignUp } from './pages/SignUp';
import { Login } from './pages/Login';

function Sign({user,setUser}) {
  return (
      <Routes>
        <Route path="/" element={<SignUp user={user} setUser={setUser}  />} />
        <Route path="login" element={<Login user={user} setUser={setUser} />} />
      </Routes>

  );
}

export default Sign;