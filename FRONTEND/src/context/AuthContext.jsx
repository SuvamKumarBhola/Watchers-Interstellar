import React, { createContext, useState, useEffect, useContext } from 'react';
import AuthService from '../services/auth.service';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const user = await AuthService.getCurrentUser();
                    if (user) setCurrentUser(user);
                    else AuthService.logout();
                } catch (err) {
                    AuthService.logout();
                }
            }
            setLoading(false);
        };

        checkUser();
    }, []);

    const login = async (email, password) => {
        const data = await AuthService.login({ email, password });
        setCurrentUser(data.user || { email });
        return data;
    };

    const register = async (firstname, lastname, email, password) => {
        const data = await AuthService.register({ firstname, lastname, email, password });
        setCurrentUser(data.user || { firstname, lastname, email });
        return data;
    };

    const logout = () => {
        AuthService.logout();
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
