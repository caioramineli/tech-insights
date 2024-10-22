import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Loading from '../../components/Loading';
import axios from 'axios';
import { FaHeart } from "react-icons/fa";
import { FaMapLocationDot, FaRegAddressCard } from "react-icons/fa6";
import { PiUserCircleLight } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { HiShoppingBag } from "react-icons/hi2";
import { PedidoContainer } from '../../components/Pedido';

export default function Conta() {
    const { user } = useContext(AuthContext);
    const [pedidos, setPedidos] = useState([]);
    const api = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await axios.get(`${api}user/${user.id}/orders`);
                setPedidos(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        if (user) {
            fetchPedidos();
        }
    }, [user, api]);

    if (!pedidos) {
        return (
            <div className='flex justify-center'>
                <Loading />
            </div>
        );
    }

    return (
        <div className='containerPadrao my-8 sm:my-10 gap-1'>
            <h1 className='flex text-2xl justify-center font-bold pb-1 text-zinc-900'>MINHA CONTA</h1>
            <hr className='border border-emerald-600 w-52 m-auto' />

            <div className='flex items-center p-3 bsPadrao bg-white rounded-md gap-4 mt-4'>
                <span className='min-w-10'>
                    <PiUserCircleLight className='text-5xl' />
                </span>
                <div className='flex flex-col justify-center'>
                    <span className='text-lg font-bold'>Seja Bem-vindo, {user.nome}</span>
                    <span>{user.email}</span>
                </div>
            </div>

            <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 mt-2'>
                <Link to={'meus-dados'}>
                    <div className='flex flex-col sm:flex-row items-center justify-center p-3 sm:p-5 bsPadrao bg-white rounded-md gap-2 sm:gap- h-36'>
                        <span>
                            <FaRegAddressCard className='text-emerald-600 text-3xl sm:text-4xl' />
                        </span>
                        <div className='grid grid-cols-1 '>
                            <h2 className='text-sm sm:text-base font-bold'>MEUS DADOS</h2>
                            <p className='text-sm sm-1 hidden sm:block'>Altere seus dados cadastrados. </p>
                        </div>
                    </div>
                </Link>

                <Link to={'pedidos'}>
                    <div className='flex flex-col sm:flex-row items-center justify-center p-3 sm:p-5 bsPadrao bg-white rounded-md gap-2 sm:gap- h-36'>
                        <span>
                            <HiShoppingBag className='text-emerald-600 text-3xl sm:text-4xl' />
                        </span>
                        <div className='grid grid-cols-1 '>
                            <h2 className='text-sm sm:text-base font-bold uppercase'>Meu pedidos</h2>
                            <p className='text-sm sm-1 hidden sm:block'>Veja históricos e acompanhe suas compras.</p>
                        </div>
                    </div>
                </Link>

                <Link to={'favoritos'}>
                    <div className='flex flex-col sm:flex-row items-center justify-center p-3 sm:p-5 bsPadrao bg-white rounded-md gap-2 sm:gap-4 h-36'>
                        <span>
                            <FaHeart className='text-emerald-600 text-3xl sm:text-4xl' />
                        </span>
                        <div className='grid grid-cols-1 '>
                            <h2 className='text-sm sm:text-base font-bold uppercase'>Favoritos</h2>
                            <p className='text-sm sm-1 hidden sm:block'>Consulte sua lista de produtos favoritos</p>
                        </div>
                    </div>
                </Link>

                <Link to={'enderecos'}>
                    <div className='flex flex-col sm:flex-row items-center justify-center p-3 sm:p-5 bsPadrao bg-white rounded-md gap-2 sm:gap- h-36'>
                        <span>
                            <FaMapLocationDot className='text-emerald-600 text-3xl sm:text-4xl' />
                        </span>
                        <div className='grid grid-cols-1 '>
                            <h2 className='text-sm sm:text-base font-bold uppercase'>Meus Endereços</h2>
                            <p className='text-sm sm-1 hidden sm:block'> Veja seus endereços ou cadastre um novo endereço.</p>
                        </div>
                    </div>
                </Link>
            </div>

            <hr className='border border-emerald-600 w-full mt-5' />

            <div className='flex flex-row justify-between mt-4 mb-1'>
                <h1 className='font-bold uppercase '>Resumo do seu último pedido</h1>
                <Link to={'pedidos'} className='hidden sm:block uppercase underline decoration-solid text-sm'> ir para meus pedidos</Link>
            </div>

            {pedidos.length === 0 ? (
                <p>Nenhum pedido encontrado.</p>
            ) : (
                <>
                    <PedidoContainer pedido={pedidos[pedidos.length - 1]} />
                </>
            )}
        </div>
    );
}
