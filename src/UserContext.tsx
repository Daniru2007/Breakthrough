
import React, { useState, createContext, useEffect } from 'react';
import Cookies from 'js-cookie';


const UserContext = createContext({});

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const cookieValue = Cookies.get('user');
        return cookieValue ? JSON.parse(cookieValue) : null; // Deserialize JSON
    });

    useEffect(() => {
        if (user) {
            Cookies.set('user', JSON.stringify(user), { expires: 7 }); // Serialize to JSON
        } else {
            Cookies.remove('user'); // Remove cookie if user is null
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;

