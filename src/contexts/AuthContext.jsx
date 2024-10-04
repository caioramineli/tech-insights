import React, { createContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [favoritos, setFavoritos] = useState([]);
    const api = process.env.REACT_APP_API_URL;

    const fetchFavoritos = useCallback(async (userId) => {
        try {
            const response = await axios.get(`${api}user/${userId}/favoritos`);
            setFavoritos(response.data.favoritos);
        } catch (error) {
            console.error('Erro ao buscar favoritos:', error);
        }
    }, [api]);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            const decodedUser = jwtDecode(storedToken);
            setUser(decodedUser);
            fetchFavoritos(decodedUser.id);
        }
    }, [fetchFavoritos]);

    const updateFavoritos = async (userId) => {
        await fetchFavoritos(userId);
    };

    const login = (token) => {
        localStorage.setItem('token', token);
        setToken(token);
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
        fetchFavoritos(decodedUser.id);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setFavoritos([]);
    };

    return (
        <AuthContext.Provider value={{ user, token, favoritos, login, logout, updateFavoritos }}>
            {children}
        </AuthContext.Provider>
    );
};
