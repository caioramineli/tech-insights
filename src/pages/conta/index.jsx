import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Loading from '../../components/Loading';
import axios from 'axios';
import { FaRegAddressCard } from "react-icons/fa6";
import { LiaLuggageCartSolid } from "react-icons/lia";
import { FaRegHeart } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { VscSmiley } from "react-icons/vsc";
import { IoIosArrowForward } from "react-icons/io";
import { MdAccessible } from "react-icons/md";
import { Link } from 'react-router-dom';
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
    const getFirstName = (fullName) => {
        return fullName.split(' ')[0];
    };

    return (

        <div className='flex flex-col w-[80%] max-w-[1300px] my-12'>
            <h1 className='flex text-2xl justify-center font-bold py-2'>MINHA CONTA</h1>
            <hr className='border border-teal-600 w-60 m-auto' />

            <div className='p-3 bsPadrao bg-white rounded-md gap-2 mt-4'>
                <div className='flex flex-row'>
                    <VscSmiley className='text-4xl' />
                    <span className='text-xl p-1 font-bold text-nowrap'>Seja Bem-vindo, {getFirstName(user.nome)}</span>
                </div>
            </div>
            <div className='grid grid-cols-4 gap-3 mt-3'>
                <Link to={'dados'}>
                    <div className='flex items-center justify-center p-5 border bsPadrao bg-white rounded-md gap-4 h-36'>
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
                    <div className='flex items-center justify-center p-5 border bsPadrao bg-white rounded-md gap-4 h-36'>
                        <span>
                            <LiaLuggageCartSolid className='text-emerald-600 text-4xl' />
                        </span>
                        <div className='grid grid-cols-1 '>
                            <h2 className='text-base font-bold uppercase'>Meu pedidos</h2>
                            <p className='text-sm sm-1'>Veja históricos e acompanhe suas compras.</p>
                        </div>
                    </div>
                </Link>

                <Link to={'favoritos'}>
                    <div className='flex items-center justify-center p-5 border bsPadrao bg-white rounded-md gap-4 h-36'>
                        <span>
                            <FaRegHeart className='text-emerald-600 text-4xl' />
                        </span>
                        <div className='grid grid-cols-1 '>
                            <h2 className='text-base font-bold uppercase'>Favoritos</h2>
                            <p className='text-sm sm-1'>Veja seus Favoritos</p>
                        </div>
                    </div>
                </Link>

                <Link to={'enderecos'}>
                    <div className='flex items-center justify-center p-5 border bsPadrao bg-white rounded-md gap-4 h-36'>
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
            <hr className='border border-teal-600 w-full mt-4' />
            <div className='flex flex-row justify-between mt-4'>
                <h1 className='font-bold uppercase '>Resumo do seu ultimo pedido</h1>
                <Link to={'pedidos'} className='uppercase underline decoration-solid'> ir para meus pedidos</Link>
            </div>      
            <div className='flex flex-col bsPadrao bg-white mt-4 rounded-md'>
                <div className='gap-2 p-2 items-center '>
                    <div className='flex p-1 gap-2 items-center'>
                        <h1 className='font-bold uppercase'>Pedido:</h1>
                        <p className=' items-center'> cod-pedido - 02/02/2022 </p>
                        <Link className='flex ml-auto '>
                            <button className='flex flex-row border bg-emerald-600 p-2 rounded-md items-center'>
                                <h2 className='text-base uppercase text-teal-50'> ver Detalhes </h2>
                                <IoIosArrowForward className='text-teal-50' />
                            </button>
                        </Link>
                    </div>
                </div>
                <hr />
                <div className='p-3 gap-2 mt-1 items-center '>
                    <h1 className='font-bold uppercase text-teal-600'>Aguardando o status do pedido</h1>
                </div>
                <hr />
                <div className='p-3 gap-2 mt-1 items-center '>
                    <h1>IMG  Pagamento via FORMA-PAGAMENTO</h1>
                </div>
                <hr />
                <div className='flex flex-row p-3 gap-4 mt-1 items-center '>
                    <MdAccessible className='text-6xl border bsPadrao bg-white '/>
                    <div className='grid grid-cols-1 gap-1'>
                        <h1 className='font-bold uppercase'>Caderante de primeira classe  </h1>
                        <p>Quantidade: 0</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
