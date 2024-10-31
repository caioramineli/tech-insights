import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../contexts/AuthContext';
import { HiShoppingBag } from 'react-icons/hi2';
import VoltarMinhaConta from '../../../components/VoltarMinhaConta';
import { PedidoContainer } from '../../../components/Pedido';
import Loading from '../../../components/Loading';

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

    if (loading) {
        return <Loading />;
    }

    return (
        <div className='containerPadrao !my-6 sm:!my-8 gap-2'>
            <div className="flex justify-between items-center">
                <div className='flex items-center gap-2'>
                    <HiShoppingBag className='text-emerald-600 text-2xl sm:text-3xl' />
                    <h1 className='font-bold text-zinc-900 text-lg md:text-2xl'>Meus Pedidos</h1>
                </div>
                <VoltarMinhaConta />
            </div>
            <hr className='border my-2' />
            {pedidos.length === 0 ? (
                <p>Nenhum pedido encontrado.</p>
            ) : (
                <div className='flex flex-col gap-6'>
                    {pedidos.map((pedido) => (
                        <PedidoContainer pedido={pedido} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Pedidos;
