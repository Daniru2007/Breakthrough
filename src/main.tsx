
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import {UserProvider} from "./UserContext.tsx";

createRoot(document.getElementById('root')!).render(

      <UserProvider>
          <App />
      </UserProvider>

);