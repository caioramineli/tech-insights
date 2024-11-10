import React, { createContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [favoritos, setFavoritos] = useState([]);
    const [loading, setLoading] = useState(true); // Adicionando estado de loading
    const api = process.env.REACT_APP_API_URL;

    const fetchFavoritos = useCallback(async (userId) => {
        try {
            const response = await axios.get(`${api}user/${userId}/favoritos`);
            setFavoritos(response.data.favoritos);
        } catch (error) {
            console.error('Erro ao buscar favoritos:', error);
        }
    }, [api]);

    const loadUserFromToken = useCallback(async (storedToken) => {
        if (storedToken) {
            try {
                const decodedUser = jwtDecode(storedToken);
                setToken(storedToken);
                setUser(decodedUser);
                await fetchFavoritos(decodedUser.id);
            } catch (error) {
                console.error('Erro ao decodificar token:', error);
                logout();
            }
        }
        setLoading(false);
    }, [fetchFavoritos]);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            loadUserFromToken(storedToken);
        } else {
            setLoading(false);
        }
    }, [loadUserFromToken]);


    const login = async (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        const decodedUser = jwtDecode(newToken);
        setUser(decodedUser);
        await fetchFavoritos(decodedUser.id);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setFavoritos([]);
    };

    return (
        <AuthContext.Provider value={{ user, token, favoritos, login, logout, updateFavoritos: fetchFavoritos, loading }}>
            {children}
        </AuthContext.Provider>
    );
}