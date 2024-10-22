import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import Loading from '../../../components/Loading';
import { useParams } from 'react-router-dom';
import { FaReceipt } from "react-icons/fa";
import { format } from 'date-fns';
import VoltarMinhaConta from '../../../components/VoltarMinhaConta';


export default function Pedido() {
    const { user } = useContext(AuthContext);
    const { idPedido } = useParams();
    const [pedido, setPedido] = useState(null)
    const [loading, setLoading] = useState(true);
    const api = process.env.REACT_APP_API_URL;

    function formatarPreco(preco) {
        return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await axios.get(`${api}user/${user.id}/orders/${idPedido}`);
                setPedido(response.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchPedidos();
        }
    }, [user, api, idPedido]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="containerPadrao my-6 sm:my-8 gap-4">
            <div className='flex items-center gap-2'>
                <FaReceipt className='text-emerald-600 text-2xl sm:text-3xl' />
                <h1 className='font-bold text-zinc-900 text-lg md:text-2xl'>Pedido {pedido.numeroPedido}</h1>
            </div>
            <hr />
            <div className='flex items-center justify-between'>
                <p className='text-zinc-900 text-base'><span className="font-semibold">Data do pedido:</span> {format(new Date(pedido.data), "dd/MM/yyyy HH:mm")}</p>
                <p className='font-bold text-zinc-900 text-base'>Status: <span className='text-emerald-600 uppercase'>Pedido realizado</span></p>
            </div>
            <hr />
            <div className="flex gap-3">
                <div className="bg-white rounded-lg min-w-[550px]">
                    <ul>
                        {pedido.produtos.map((produto) => (
                            <div key={produto.dadosProduto._id}>
                                <hr />
                                <div className='flex gap-4 items-center py-2 px-3'>
                                    <img className='w-20' src={api + produto.dadosProduto.images[0]} alt="img-principal" />
                                    <div className='grid grid-cols-1 gap-3'>
                                        <h1 className='font-bold uppercase'> {produto.dadosProduto.nome}</h1>
                                        <div className="flex flex-row justify-between">
                                            <p>Quantidade: {produto.quantidade}</p>
                                            <p>{formatarPreco(pedido.valorTotal + pedido.desconto - pedido.frete.valor)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </ul>
                    <hr />
                </div>
                <div className="flex flex-col min-w-[250px] p-3 bg-white rounded-lg">
                    <div>
                        <span className="font-bold">{user.nome}</span>
                        <p>Endereço</p>
                        <hr />
                    </div>

                    <div>
                        <h1>Pagamento via TIPO</h1>
                        <p>10x sem juros</p>
                    </div>
                    <hr />
                    <div className="flex flex-row justify-between">
                        <p>Total produto(s): </p>
                        <p>{formatarPreco(pedido.valorTotal + pedido.desconto - pedido.frete.valor)}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p>Frete valor: </p>
                        <p>{formatarPreco(pedido.frete.valor)}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p>Desconto: </p>
                        <p>- {formatarPreco(pedido.desconto)}</p>
                    </div>
                    <hr />
                    <div className="flex flex-row justify-between">
                        <p className="font-bold">Valor total: </p>
                        <p>{formatarPreco(pedido.valorTotal)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}