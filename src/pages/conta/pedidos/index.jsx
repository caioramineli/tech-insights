import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { IoIosArrowForward } from "react-icons/io";
import { IoClose } from 'react-icons/io5';
import { MdAccessible } from "react-icons/md";
import { AuthContext } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';


const Pedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(true);
    const api = process.env.REACT_APP_API_URL;


    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await axios.get(`${api}user/${user.id}/orders`);
                setPedidos(response.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchPedidos();
        }
    }, [user, api]);

    if (loading) return <div>Carregando...</div>;

    return (
        <div className='flex flex-col w-[90%] xl:w-[80%] max-w-[1300px] my-10 gap-2'>
            <h1 className='flex text-2xl justify-center font-bold py-1 text-zinc-900 uppercase'>Meus Pedidos</h1>
            <hr className='border border-emerald-600 w-52 m-auto' />
            {pedidos.length === 0 ? (
                <p>Nenhum pedido encontrado.</p>
            ) : (




                <ul className='flex flex-col gap-6'>
                    {pedidos.map((pedido) => (
                        <div className='flex flex-col bsPadrao bg-white rounded-md' key={pedido._id}>
                            <hr />
                            <div className='flex gap-2 items-center justify-between py-2 px-3'>
                                <h2><span className='font-bold'>Numero do pedido: </span>{pedido._id} - {new Date(pedido.data).toLocaleDateString()}</h2>
                                <Link to={'pedidos'}>
                                    <button className='flex gap-1 bg-emerald-600 hover:bg-emerald-700 duration-200 p-2 rounded-md items-center text-emerald-50'>
                                        Ver Detalhes
                                        <IoIosArrowForward className='text-emerald-50 text-lg' />
                                    </button>
                                </Link >
                            </div>
                            <hr />
                            <div className='flex gap-2 items-center py-2 px-3'>
                                <h1><span className='font-bold'>Forma de Pagamento:</span> {pedido.formaPagamento}</h1>
                            </div>
                            <hr />

                            <h1 className='font-bold uppercase text-emerald-600 py-2 px-3'>Aguardando o status do pedido</h1>

                            <hr />
                            <ul>
                                {pedido.produtos.map((produto) => (
                                    <div className='flex gap-4 items-center py-2 px-3'>
                                        <MdAccessible className='text-6xl border bsPadrao bg-white ' />
                                        <div className='grid grid-cols-1 gap-1'>
                                            <h1 className='font-bold uppercase' key={produto.dadosProduto._id}> {produto.dadosProduto.nome}</h1>
                                            <p>Quantidade: {produto.quantidade}</p>
                                        </div>

                                    </div>
                                ))}
                            </ul>
                        </div>

                    ))}
                </ul>
            )}
        </div>
    );
};

export default Pedidos;
