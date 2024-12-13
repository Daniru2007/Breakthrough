import './Sign.css';
import { Routes, Route } from 'react-router-dom';
import { SignUp } from './pages/SignUp';
import { Login } from './pages/Login';

function Sign() {
  return (
      <Routes>
        <Route path="/" element={<SignUp/>} />
        <Route path="login" element={<Login/>} />
      </Routes>

  );
}

export default Sign;