import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../contexts/AuthContext';
import Loading from '../../../components/Loading';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const MovimentacaoEstoque = () => {
    const { token } = useContext(AuthContext);
    const api = process.env.REACT_APP_API_URL;

    const [movimentacoes, setMovimentacoes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMovimentacoes = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${api}listar-movimentacoes`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                console.log(response.data);


                setMovimentacoes(response.data);
                setError('');
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setError('Nenhuma movimentação encontrada.');
                } else {
                    setError('Erro ao buscar movimentações.');
                }
                setMovimentacoes([]);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchMovimentacoes();
        }
    }, [token, api]);

    return (
        <div className="mx-auto gap-2 p-2">
            <div className='flex items-center justify-between gap-2'>
                <h1 className="text-lg sm:text-2xl font-bold text-zinc-900">Movimentações do estoque</h1>
                <p className="text-base">
                    <span className="font-bold">{movimentacoes.length}</span> movimentacões encontradas
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
                        {movimentacoes.map((movimentacao, index) => (
                            <div
                                key={movimentacao._id}
                                className={`grid sm:grid-cols-2 lg:grid-cols-3 text-zinc-900 text-sm p-3 gap-3 ${index === movimentacoes.length - 1 ? '' : 'border-b'}`}
                            >
                                <div className="flex flex-col justify-center">
                                    <p>
                                        <strong>Nome do produto: </strong>
                                        {movimentacao.produtoId.nome}
                                    </p>
                                </div>

                                <Link to={`/movimentacao/${movimentacao.produtoId._id}`}>
                                    <div className="flex flex-col justify-center items-center">
                                        <img
                                            src={api + movimentacao.produtoId.images[0]}
                                            alt={movimentacao.produtoId.nome}
                                            className="w-20 h-20 object-cover"
                                        />
                                        <p><strong>Quantidade: </strong><span>{movimentacao.quantidade}</span></p>
                                    </div>
                                </Link>

                                <div className="flex flex-col gap-1 justify-center text-base">
                                    <div className='m-auto'>
                                        <p><strong>Data: </strong><span>{format(new Date(movimentacao.dataMovimento), "dd/MM/yyyy HH:mm")}</span></p>
                                        <p><strong>Origem: </strong><span>{movimentacao.origem}</span></p>
                                        <p><strong>Usuário: </strong><span>{movimentacao.usuario.nome}</span></p>
                                        <p><strong>Email: </strong><span>{movimentacao.usuario.email}</span></p>
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

export default MovimentacaoEstoque;