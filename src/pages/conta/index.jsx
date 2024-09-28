import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Loading from '../../components/Loading';
import axios from 'axios';
// import { PiUserCircleLight } from "react-icons/pi";
import { FaRegAddressCard } from "react-icons/fa6";
import { LiaLuggageCartSolid } from "react-icons/lia";
import { FaRegHeart } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";

import './style.css';

export default function Conta() {
    const { user, token } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const api = process.env.REACT_APP_API_URL;

    const [toggle, setToggle] = useState(1);
    function updateToglle(id) {
        setToggle(id);
    }
    useEffect(() => {
        if (user && token) {
            axios.get(`${api}user/${user.id}`, {
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
        }
    }, [user, token, api]);

    if (!userData) {
        return (
            <div className='flex justify-center'>
                <Loading />
            </div>
        );
    }

    return (

        <div className='flex'>
            <div className="conta-container">
                <h1 className='flex text-xl justify-center font-bold py-2'>MINHA CONTA</h1>
                <hr className='border border-teal-600 w-full ' />
                <br />
                <div className='grid grid-cols-2 gap-3'>
                    <button className='flex flex-col items-center gap-1' onClick={() => updateToglle(1)}>
                        <FaRegAddressCard className={toggle === 1 ? 'text-teal-600 text-4xl' : 'text-zinc-400 text-4xl'} />
                        Meu cadastro
                    </button>

                    <button className='flex flex-col items-center gap-1' onClick={() => updateToglle(2)}>
                        <LiaLuggageCartSolid className={toggle === 2 ? 'text-teal-600 text-4xl' : 'text-zinc-400 text-4xl'} />
                        Meu pedidos
                    </button>

                    <button className='flex flex-col items-center gap-1' onClick={() => updateToglle(3)}>
                        <FaRegHeart className={toggle === 3 ? 'text-teal-600 text-4xl' : 'text-zinc-400 text-3xl'} />
                        Favoritos
                    </button>

                    <button className='flex flex-col items-center gap-1' onClick={() => updateToglle(4)}>
                        <FaMapLocationDot className={toggle === 4 ? 'text-teal-600 text-4xl' : 'text-zinc-400 text-4xl'} />
                        Meus Endereços
                    </button>




                </div>
                <br />
                <hr className='border border-teal-600 w-full' />
                <div className={toggle === 1 ? 'grid items-center  gap-2 w-[95%] sm:w-11/12 m-auto' : 'hidden'}>
                    <p><strong>Nome do Perfil:</strong> {userData.nome}</p>
                    <p><strong>CPF:</strong> {userData.cpf}</p>
                    <p><strong>Data de Nascimento:</strong> {userData.dataNascimento}</p>
                    <p><strong>Telefone:</strong> {userData.telefone}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                </div>
                <div className={toggle === 2 ? 'flex flex-col items-center gap-2 w-[95%] sm:w-11/12 m-auto' : 'hidden'}>
                    <p className='font-bold'>Todos pedidos</p>
                    <hr className='border border-teal-600 w-full' />
                    <p>****PEDIDOS****</p>
                </div>
            </div>
        </div>
    );
}
