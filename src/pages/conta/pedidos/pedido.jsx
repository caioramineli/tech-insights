import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import Loading from '../../../components/Loading';
import { Link, useParams } from 'react-router-dom';
import { FaReceipt } from "react-icons/fa";
import { format } from 'date-fns';
import VoltarMinhaConta from '../../../components/VoltarMinhaConta';
import { IconePagamento } from '../../../components/IconePagamento'

export default function Pedido() {
    const { user, token } = useContext(AuthContext);
    const { idPedido } = useParams();
    const [pedido, setPedido] = useState(null)
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(false);
    const api = process.env.REACT_APP_API_URL;

    function formatarPreco(preco) {
        return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await axios.get(`${api}user/${user.id}/orders/${idPedido}`, { headers: { 'Authorization': `Bearer ${token}` } });
                setPedido(response.data);
            } catch (err) {
                console.log(err);
                setErro(true);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchPedidos();
        }
    }, [user, api, idPedido, token]);

    if (loading) {
        return <Loading />;
    }

    if (erro) {
        return <h1 className='text-2xl font-semibold text-zinc-950 m-auto'>Erro ao carregar pedido!</h1>;
    }

    return (
        <div className="containerPadrao !my-6 sm:!my-8 gap-4">
            <div className="flex items-center justify-between">
                <div className='flex items-center gap-2'>
                    <FaReceipt className='text-emerald-600 text-2xl sm:text-3xl' />
                    <h1 className='font-bold text-zinc-900 text-lg md:text-2xl'>Pedido {pedido.numeroPedido}</h1>
                </div>
                <VoltarMinhaConta caminho='/minha-conta/pedidos' />
            </div>
            <hr />
            <div className='flex flex-col sm:flex-row sm:items-center justify-between'>
                <p className='text-zinc-900 text-base'><span className="font-semibold">Data do pedido:</span> {format(new Date(pedido.data), "dd/MM/yyyy HH:mm")}</p>
                <p className='font-bold text-zinc-900 text-base'>Status: <span className='text-emerald-600 uppercase'>{pedido.status}</span></p>
            </div>

            <hr />

            <div className='flex flex-col gap-1'>
                <div className='flex items-center justify-between'>
                    <p className='font-bold text-zinc-900'>Pedido</p>
                    <p>
                        <span className='font-bold text-zinc-900'>Frete: </span>
                        <span className='uppercase text-sm'>{pedido.frete.tipo}</span>
                    </p>
                </div>
                <div className="flex flex-col md:flex-row items-start gap-3 w-full">
                    <div className='flex flex-col p-1 bsPadrao rounded-md bg-white w-full md:w-[72%] order-2 md:order-1'>
                        {pedido.produtos.map((produto, index) => (
                            <div
                                key={produto.dadosProduto._id}
                                className={`flex gap-4 items-center py-2 px-3 ${index > 0 ? 'border-t border-gray-300' : ''}`}
                            >
                                <Link to={`/produto/${produto.dadosProduto._id}`}>
                                    <img
                                        className='w-20'
                                        src={api + produto.dadosProduto.images[0]}
                                        alt="img-principal"
                                    />
                                </Link>
                                <div className='grid grid-cols-1 gap-3 w-full'>
                                    <h1 className='text-sm font-semibold uppercase'>{produto.dadosProduto.nome}</h1>
                                    <div className="flex flex-row justify-between">
                                        <p>Quantidade: {produto.quantidade}</p>
                                        {(pedido.formaPagamento === "PIX" || pedido.formaPagamento === "Boleto") ? (
                                            <p>{formatarPreco((produto.dadosProduto.preco) * produto.quantidade)}</p>
                                        ) : (
                                            <p>{formatarPreco((produto.dadosProduto.precoPrazo) * produto.quantidade)}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col min-w-[260px] px-4 py-2 bg-white bsPadrao rounded-md gap-2 text-sm w-full md:w-[28%] order-1 md:order-2">
                        <div className='flex flex-col'>
                            <span className="font-semibold">{user.nome}</span>
                            <p>{pedido.endereco.rua}, {pedido.endereco.numero}, {pedido.endereco.cidade}, {pedido.endereco.estado}</p>
                        </div>
                        <hr />
                        <h3 className='font-semibold flex items-center gap-2'>Pagamento via {pedido.formaPagamento} <IconePagamento pagamento={pedido.formaPagamento} /></h3>
                        <hr />
                        <div className="flex justify-between">
                            <p>Total produto(s): </p>
                            <p>{formatarPreco(pedido.valorTotal + pedido.desconto - pedido.frete.valor)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Frete: </p>
                            <p>{formatarPreco(pedido.frete.valor)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Desconto: </p>
                            <p>{pedido.desconto > 0 ? `- ${formatarPreco(pedido.desconto)}` : formatarPreco(pedido.desconto)}</p>
                        </div>
                        <hr />
                        <div className="flex justify-between">
                            <p className="font-semibold">Valor total: </p>
                            <p className='font-semibold'>{formatarPreco(pedido.valorTotal)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}