import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import Loading from '../../../components/Loading';
import { useParams } from 'react-router-dom';
import { FaBarcode, FaReceipt, FaRegCreditCard } from "react-icons/fa";
import { format } from 'date-fns';
import VoltarMinhaConta from '../../../components/VoltarMinhaConta';
import { FaPix } from 'react-icons/fa6';
import { SiMercadopago } from 'react-icons/si';


export default function Pedido() {
    const { user } = useContext(AuthContext);
    const { idPedido } = useParams();
    const [pedido, setPedido] = useState(null)
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(false);
    const api = process.env.REACT_APP_API_URL;

    function formatarPreco(preco) {
        return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    const exibirIconePagamento = () => {
        switch (pedido.formaPagamento) {
            case 'PIX':
                return <FaPix className="text-xl text-teal-600" />;
            case 'Boleto':
                return <FaBarcode className="text-xl text-zinc-900" />;
            case 'Cartão':
                return <FaRegCreditCard className="text-xl text-cyan-700" />;
            case 'Mercado Pago':
                return <SiMercadopago className="text-xl text-sky-700" />;
            default:
                return null;
        }
    };

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await axios.get(`${api}user/${user.id}/orders/${idPedido}`);
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
    }, [user, api, idPedido]);

    if (loading) {
        return <Loading />;
    }

    if (erro) {
        return <h1 className='text-2xl font-semibold text-zinc-950 m-auto'>Erro ao carregar pedido!</h1>;
    }

    return (
        <div className="containerPadrao my-6 sm:my-8 gap-4">
            <div className="flex items-center justify-between">
                <div className='flex items-center gap-2'>
                    <FaReceipt className='text-emerald-600 text-2xl sm:text-3xl' />
                    <h1 className='font-bold text-zinc-900 text-lg md:text-2xl'>Pedido {pedido.numeroPedido}</h1>
                </div>
                <VoltarMinhaConta caminho='/minha-conta/pedidos' />
            </div>
            <hr />
            <div className='flex items-center justify-between'>
                <p className='text-zinc-900 text-base'><span className="font-semibold">Data do pedido:</span> {format(new Date(pedido.data), "dd/MM/yyyy HH:mm")}</p>
                <p className='font-bold text-zinc-900 text-base'>Status: <span className='text-emerald-600 uppercase'>Pedido realizado</span></p>
            </div>

            <hr />

            <div className='flex items-center justify-between'>
                <p className='font-bold text-zinc-900'>Pedidos(s)</p>
                <p>
                    <span className='font-bold text-zinc-900'>Frete: </span>
                    <span className='uppercase text-sm'>{pedido.frete.tipo}</span>
                </p>
            </div>

            <div className="flex items-start gap-3 w-full">

                <div className='flex flex-col p-1 bsPadrao rounded-md bg-white w-[72%]'>
                    {pedido.produtos.map((produto, index) => (
                        <div
                            key={produto.dadosProduto._id}
                            className={`flex gap-4 items-center py-2 px-3 ${index > 0 ? 'border-t border-gray-300' : ''}`}
                        >
                            <img
                                className='w-20'
                                src={api + produto.dadosProduto.images[0]}
                                alt="img-principal"
                            />
                            <div className='grid grid-cols-1 gap-3 w-full'>
                                <h1 className='text-sm font-semibold uppercase'>{produto.dadosProduto.nome}</h1>
                                <div className="flex flex-row justify-between">
                                    <p>Quantidade: {produto.quantidade}</p>
                                    <p>{formatarPreco(pedido.valorTotal + pedido.desconto - pedido.frete.valor)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col min-w-[260px] px-4 py-2 bg-white bsPadrao rounded-md gap-2 text-sm w-[28%]">
                    <div className='flex flex-col'>
                        <span className="font-semibold">{user.nome}</span>
                        <p>{pedido.endereco.rua}, {pedido.endereco.numero}, {pedido.endereco.cidade}, {pedido.endereco.estado}</p>
                    </div>

                    <hr />

                    <h3 className='font-semibold flex items-center gap-2'>Pagamento via {pedido.formaPagamento} {exibirIconePagamento()}</h3>

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
    )
}