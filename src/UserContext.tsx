// @ts-nocheck
import React, { useState, createContext, useEffect } from 'react';
import Cookies from 'js-cookie';

// Create the User Context
const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    // Parse the cookie value (if it exists), otherwise set user to null
    const [user, setUser] = useState(() => {
        const cookieValue = Cookies.get('user');
        return cookieValue ? JSON.parse(cookieValue) : null; // Deserialize JSON
    });

    // Update the cookie whenever the user state changes
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

