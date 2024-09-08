import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function Conta() {
    const { user, token } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (user && token) {
            fetch(`https://backend-tech-insights.vercel.app/user/${user.id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Erro ao carregar dados do usuário');
                    }
                    return response.json();
                })
                .then((data) => setUserData(data.user))
                .catch((error) =>
                    console.error('Erro ao carregar dados do usuário:', error)
                );
        }
    }, [user, token, navigate]);

    return (
        <div className="conta-container">
            <h1 className='text-xl'>Minha Conta</h1>
            {userData ? (
                <div className="user-details">
                    <p><strong>Nome:</strong> {userData.nome}</p>
                    <p><strong>CPF:</strong> {userData.cpf}</p>
                    <p><strong>Data de Nascimento:</strong> {userData.dataNascimento}</p>
                    <p><strong>Telefone:</strong> {userData.telefone}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                </div>
            ) : (
                <div className='flex justify-center'>
                    <Loading />
                </div>
            )}
        </div>
    );
};
