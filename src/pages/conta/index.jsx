import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Loading from '../../components/Loading';
import axios from 'axios';
import { FaRegHeart } from "react-icons/fa";
import { FaMapLocationDot, FaRegAddressCard } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { PiUserCircleLight } from "react-icons/pi";
import { MdAccessible } from "react-icons/md";
import { Link } from 'react-router-dom';
import { HiShoppingBag } from "react-icons/hi2";

import './style.css';

export default function Conta() {
    const { user, token } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const api = process.env.REACT_APP_API_URL;

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

        <div className='flex flex-col w-[90%] xl:w-[80%] max-w-[1300px] my-10 gap-1'>
            <h1 className='flex text-2xl justify-center font-bold py-1 text-zinc-900'>MINHA CONTA</h1>
            <hr className='border border-emerald-600 w-52 m-auto' />

            <div className='flex items-center p-3 bsPadrao bg-white rounded-md gap-4 mt-4'>
                <PiUserCircleLight className='text-5xl' />
                <div className='flex flex-col justify-center'>
                    <span className='text-lg font-bold text-nowrap'>Seja Bem-vindo, {user.nome}</span>
                    <span>{user.email}</span>
                </div>
            </div>
            <div className='grid grid-cols-4 gap-3 mt-2'>
                <Link to={'dados'}>
                    <div className='flex items-center justify-center p-5 bsPadrao bg-white rounded-md gap-4 h-36'>
                        <span>
                            <FaRegAddressCard className='text-emerald-600 text-4xl' />
                        </span>
                        <div className='grid grid-cols-1 '>
                            <h2 className='text-base font-bold'>MEUS DADOS</h2>
                            <p className='text-sm sm-1'>Altere seus dados cadastrados. </p>
                        </div>
                    </div>
                </Link>

                <Link to={'pedidos'}>
                    <div className='flex items-center justify-center p-5 bsPadrao bg-white rounded-md gap-4 h-36'>
                        <span>
                            <HiShoppingBag className='text-emerald-600 text-4xl' />
                        </span>
                        <div className='grid grid-cols-1 '>
                            <h2 className='text-base font-bold uppercase'>Meu pedidos</h2>
                            <p className='text-sm sm-1'>Veja históricos e acompanhe suas compras.</p>
                        </div>
                    </div>
                </Link>

                <Link to={'favoritos'}>
                    <div className='flex items-center justify-center p-5 bsPadrao bg-white rounded-md gap-4 h-36'>
                        <span>
                            <FaRegHeart className='text-emerald-600 text-4xl' />
                        </span>
                        <div className='grid grid-cols-1 '>
                            <h2 className='text-base font-bold uppercase'>Favoritos</h2>
                            <p className='text-sm sm-1'>Consulte sua lista de produtos favoritos</p>
                        </div>
                    </div>
                </Link>

                <Link to={'enderecos'}>
                    <div className='flex items-center justify-center p-5 bsPadrao bg-white rounded-md gap-4 h-36'>
                        <span>
                            <FaMapLocationDot className='text-emerald-600 text-4xl' />
                        </span>
                        <div className='grid grid-cols-1 '>
                            <h2 className='text-base font-bold uppercase'>Meus Endereços</h2>
                            <p className='text-sm sm-1'> Veja seus endereços ou cadastre um novo endereço.</p>
                        </div>
                    </div>
                </Link>
            </div>

            <hr className='border border-emerald-600 w-full mt-5' />

            <div className='flex flex-row justify-between mt-4'>
                <h1 className='font-bold uppercase '>Resumo do seu último pedido</h1>
                <Link to={'pedidos'} className='uppercase underline decoration-solid text-sm'> ir para meus pedidos</Link>
            </div>

            <div className='flex flex-col bsPadrao bg-white rounded-md '>
                <div className='flex gap-2 items-center justify-between py-2 px-3'>
                    <p><span className='font-bold'>Pedido:</span> cod-pedido - 02/02/2022 </p>
                    <Link>
                        <button className='flex gap-1 bg-emerald-600 hover:bg-emerald-700 duration-200 p-2 rounded-md items-center text-emerald-50'>
                            Ver Detalhes
                            <IoIosArrowForward className='text-emerald-50 text-lg' />
                        </button>
                    </Link>
                </div>

                <hr />

                <h1 className='font-bold uppercase text-emerald-600 py-2 px-3'>Aguardando o status do pedido</h1>

                <hr />

                <div className='flex gap-2 mt-1 items-center py-2 px-3'>
                    <h1>IMG  Pagamento via FORMA-PAGAMENTO</h1>
                </div>

                <hr />

                <div className='flex flex-row gap-4 items-center py-2 px-3'>
                    <MdAccessible className='text-6xl border bsPadrao bg-white ' />
                    <div className='grid grid-cols-1 gap-1'>
                        <h1 className='font-bold uppercase'>Caderante de primeira classe  </h1>
                        <p>Quantidade: 0</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
