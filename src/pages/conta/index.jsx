import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './style.css';

export default function Conta() {
    const { user, token } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && token) {
            axios.get(`https://backend-tech-insights.vercel.app/user/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    setUserData(response.data.user);
                })
                .catch((error) => {
                    console.error('Erro ao carregar dados do usuário:', error);
                });
        } else {
            navigate('/login');
        }
    }, [user, token, navigate]);

    if (!userData) {
        return (
            <div className='flex justify-center'>
                <Loading />
            </div>
        );
    }

    return (
        <div className="conta-container">
            <h1 className='text-xl'>Minha Conta</h1>
            <div className="user-details">
                <p><strong>Nome:</strong> {userData.nome}</p>
                <p><strong>CPF:</strong> {userData.cpf}</p>
                <p><strong>Data de Nascimento:</strong> {userData.dataNascimento}</p>
                <p><strong>Telefone:</strong> {userData.telefone}</p>
                <p><strong>Email:</strong> {userData.email}</p>
            </div>
        </div>
    );
}
