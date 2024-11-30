import React, { useEffect, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../contexts/AuthContext';
import Loading from '../../../components/Loading';
import { IconePagamento } from '../../../components/IconePagamento';
import { IoSearch } from 'react-icons/io5';
import SelectStatus from './selectStatus';
import { ToastContainer } from 'react-toastify';

const AdminPedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { token } = useContext(AuthContext);
    const [sortOption, setSortOption] = useState('-data');
    const [input, setInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const api = process.env.REACT_APP_API_URL;

    const fetchPedidos = useCallback(async () => {
        try {
            const response = await axios.get(`${api}admin-buscar-pedidos`, {
                headers: { 'Authorization': `Bearer ${token}` },
                params: {
                    q: searchQuery,
                    sort: sortOption,
                }
            });

            if (response.status === 404) {
                setError('Nenhum pedido encontrado para o parâmetro de busca.');
                setPedidos([]);
            } else {
                setPedidos(response.data);
                setError('');
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setError('Nenhum pedido encontrado para o parâmetro de busca.');
                setPedidos([]);
            } else {
                setError('Erro ao buscar pedidos.');
                setPedidos([]);
            }
        } finally {
            setLoading(false);
        }
    }, [token, api, searchQuery, sortOption]);


    useEffect(() => {
        if (token) {
            fetchPedidos();
        }
    }, [token, fetchPedidos]);

    function envioForm(e) {
        e.preventDefault();
        setSearchQuery(input);
    }

    function formatarPreco(preco) {
        return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    return (
        <div className="containerPadrao mx-auto gap-2">
            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>
                <h1 className="text-lg sm:text-2xl font-bold text-zinc-900">Todos os Pedidos</h1>
                <form onSubmit={envioForm} className='flex items-center gap-2'>
                    <div className='flex items-center bg-white border-2 border-emerald-600 rounded-md'>
                        <input
                            type="text"
                            className='p-[6px] outline-none rounded-md'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button className="p-1 " type="submit">
                            <IoSearch className="text-emerald-700 text-2xl cursor-pointer" />
                        </button>
                    </div>
                </form>
            </div>

            <div className='flex flex-col bg-white rounded'>
                <div className='flex flex-col bg-emerald-700 sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-6 p-3 rounded-t-md'>
                    <div className='flex gap-2 items-center'>
                        <label htmlFor="ordenacao" className='text-emerald-50'>Ordenar por:</label>
                        <select
                            className='p-1 rounded-md !bg-emerald-900 text-emerald-50 outline-none'
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option value="-data">Mais Recente</option>
                            <option value="data">Mais Antiga</option>
                            <option value="preco">Menor Valor</option>
                            <option value="-preco">Maior Valor</option>
                        </select>
                    </div>
                    <p className='text-base text-emerald-50'>
                        <span className='font-bold'>{pedidos.length}</span> pedidos encontrados
                    </p>
                </div>

                {loading ? (
                    <div className='flex justify-center items-center min-h-[38vh]'>
                        <Loading />
                    </div>
                ) : error ? (
                    <div className='flex justify-center items-center min-h-[38vh]'>
                        <p className="text-lg text-zinc-900">{error}</p>
                    </div>
                ) : (
                    <div className='flex flex-col bg-white mt-1'>
                        {pedidos.map((pedido) => (
                            <div className='grid sm:grid-cols-2 lg:grid-cols-4 text-zinc-900 text-sm border-b p-3 gap-3' key={pedido._id}>
                                <div className='flex flex-col justify-center'>
                                    <p><strong>Número do Pedido: </strong>{pedido.numeroPedido}</p>
                                    <p>
                                        <strong>Data: </strong>
                                        {new Date(pedido.data).toLocaleString('pt-BR', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>

                                    <p className='mt-4'><strong>Cliente: </strong>{pedido.idUser?.nome}</p>
                                    <p><strong>Email: </strong>{pedido.idUser?.email}</p>
                                </div>
                                <div className='flex flex-col justify-center'>
                                    {pedido.produtos.map((produto) => (
                                        <div key={produto.idProduto._id} className="mb-2">
                                            <div className="flex items-center space-x-2">
                                                {produto.idProduto.images[0] && (
                                                    <img
                                                        src={api + produto.idProduto.images[0]}
                                                        alt={produto.idProduto.nome}
                                                        className="w-12 h-12 object-cover"
                                                    />
                                                )}
                                                <div>
                                                    <div className="text-sm">
                                                        {produto.quantidade}x{' '}
                                                        {pedido.formaPagamento !== 'PIX' && pedido.formaPagamento !== 'Boleto'
                                                            ? formatarPreco(produto.idProduto.precoPrazo)
                                                            : formatarPreco(produto.idProduto.preco)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                </div>

                                <div className='flex flex-col justify-center'>
                                    <p><strong>Frete: </strong>{formatarPreco(pedido.frete.valor)}</p>
                                    <p><strong>Desconto: </strong>{formatarPreco(pedido.desconto)}</p>

                                    <div className='flex items-center mt-4 gap-1'>
                                        <p><strong>Pagamento Via: </strong>{pedido.formaPagamento}</p>
                                        <IconePagamento pagamento={pedido.formaPagamento} />
                                    </div>
                                    <p><strong>Valor Total: </strong>{formatarPreco(pedido.valorTotal)}</p>
                                </div>

                                <div className='flex items-center justify-center'>
                                    <SelectStatus pedido={pedido} token={token} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default AdminPedidos;