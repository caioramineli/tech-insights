import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../contexts/AuthContext';
import Loading from '../../../components/Loading';
import { Link } from 'react-router-dom';

const RelatorioEstoqueMinimo = ({ estoqueMinimo, titulo }) => {
    const { token } = useContext(AuthContext);
    const api = process.env.REACT_APP_API_URL;

    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProdutos = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${api}listar-produtos-por-estoque`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                    params: { estoque: estoqueMinimo },
                });

                setProdutos(response.data.produtos);
                setError('');
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setError('Nenhum produto encontrado.');
                } else {
                    setError('Erro ao buscar produtos.');
                }
                setProdutos([]);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchProdutos();
        }
    }, [token, api, estoqueMinimo]);

    const formatarPreco = (preco) =>
        preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return (
        <div className="mx-auto gap-2 p-2">
            <div className='flex items-center justify-between gap-2'>
                <h1 className="text-lg sm:text-2xl font-bold text-zinc-900">{titulo}</h1>
                <p className="text-base">
                    <span className="font-bold">{produtos.length}</span> produto(s) encontrado(s)
                </p>
            </div>

            <div className="flex flex-col rounded border">
                {loading ? (
                    <div className="flex justify-center items-center min-h-[38vh]">
                        <Loading />
                    </div>
                ) : error ? (
                    <div className="flex justify-center items-center min-h-[38vh]">
                        <p className="text-lg text-zinc-900">{error}</p>
                    </div>
                ) : (
                    <div className="flex flex-col bg-white mt-1">
                        {produtos.map((produto, index) => (
                            <div
                                className={`grid sm:grid-cols-2 lg:grid-cols-3 text-zinc-900 text-sm p-3 gap-3 ${index === produtos.length - 1 ? '' : 'border-b'}`}
                                key={produto._id}
                            >
                                <div className="flex flex-col justify-center">
                                    <p>
                                        <strong>Nome: </strong>
                                        {produto.nome}
                                    </p>
                                </div>

                                <Link to={`/produto/${produto._id}`}>
                                    <div className="flex flex-col justify-center items-center">
                                        {produto.images[0] && (
                                            <img
                                                src={api + produto.images[0]}
                                                alt={produto.nome}
                                                className="w-20 h-20 object-cover"
                                            />
                                        )}
                                        <p>
                                            <strong>Preço: </strong>
                                            {formatarPreco(produto.precoPrazo)}
                                        </p>
                                    </div>
                                </Link>

                                <div className="flex flex-col gap-1 justify-center text-base">
                                    <div className='m-auto'>
                                        <p>
                                            <strong>Estoque: </strong>
                                            <span
                                                className={`${produto.estoque >= 11 ? 'text-emerald-600' : 'text-red-600'
                                                    }`}
                                            >
                                                {produto.estoque}
                                            </span>
                                        </p>
                                        <p>
                                            <strong>Status: </strong>
                                            <span
                                                className={`${produto.status === 'ativo'
                                                    ? 'text-emerald-600'
                                                    : 'text-yellow-600'
                                                    }`}
                                            >
                                                {produto.status}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RelatorioEstoqueMinimo;
