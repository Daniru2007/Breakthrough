import { createContext } from 'react';

interface User {
  email: string;
  Username: string;
  xp: number;
}

interface UserContextType {
  user: User | null;
}

const UserContext = createContext<UserContextType>({
  user: null
});

export default UserContext;