import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Loading from '../../components/Loading';
import axios from 'axios';
import { FaHeart } from "react-icons/fa";
import { FaMapLocationDot, FaRegAddressCard } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { PiUserCircleLight } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { HiShoppingBag } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';

export default function Conta() {
    const { user } = useContext(AuthContext);
    const [pedidos, setPedidos] = useState([]);
    const api = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

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

    function enviarDadosPedido(idPedido, pedido) {
        navigate(`pedidos/${idPedido}`, {
            state: { pedido }
        });
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
                <div className='flex flex-col gap-6'>
                    <div className='flex flex-col bsPadrao bg-white rounded-md' key={pedidos[pedidos.length - 1]._id}>
                        <hr />
                        <div className='flex gap-2 items-center justify-between py-2 px-3'>
                            <h2><span className='font-bold'>Numero do pedido: </span>{pedidos[pedidos.length - 1].numeroPedido} - {new Date(pedidos[pedidos.length - 1].data).toLocaleDateString()}</h2>

                            <button onClick={() => enviarDadosPedido(pedidos[pedidos.length - 1]._id, pedidos[pedidos.length - 1])} className='flex gap-1 bg-emerald-600 hover:bg-emerald-700 duration-200 p-2 rounded-md items-center text-emerald-50'>
                                Ver Detalhes
                                <IoIosArrowForward className='text-emerald-50 text-lg' />
                            </button>

                        </div>
                        <hr />
                        <div className='flex gap-2 items-center py-2 px-3'>
                            <h1><span className='font-bold'>Forma de Pagamento:</span> {pedidos[pedidos.length - 1].formaPagamento}</h1>
                        </div>
                        <hr />

                        <h1 className='font-bold uppercase text-emerald-600 py-2 px-3'>Aguardando o status do pedido</h1>

                        <ul>
                            {pedidos[pedidos.length - 1].produtos.map((produto) => (
                                <div key={produto.dadosProduto._id}>
                                    <hr />
                                    <div className='flex gap-4 items-center py-2 px-3'>
                                        <img className='w-20' src={api + produto.dadosProduto.images[0]} alt="img-principal" />
                                        <div className='grid grid-cols-1 gap-1'>
                                            <h1 className='font-bold uppercase'> {produto.dadosProduto.nome}</h1>
                                            <p>Quantidade: {produto.quantidade}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
