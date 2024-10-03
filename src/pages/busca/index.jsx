import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Produto from '../home/Produto';
import axios from 'axios';
import Loading from '../../components/Loading';

const Busca = () => {
    const location = useLocation();
    const [produtos, setProdutos] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [loading, setLoading] = useState(true);
    const api = process.env.REACT_APP_API_URL;

    const query = new URLSearchParams(location.search).get('query');

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            if (query) {
                const response = await axios.get(`${api}products/search?q=${query}&sort=${sortOption}`);
                setProdutos(response.data);
            }
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        } finally {
            setLoading(false);
        }
    }, [query, sortOption, api]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (loading) {
        return <Loading />
    }

    return (
        <main className="containerMainPaginaProdutos">
            {produtos.length > 0 ? (
                <>
                    <div className='flex justify-between items-center'>
                        <p className='text-base text-zinc-800'>
                            <span className='font-bold'>Você pesquisou por:</span> {query}
                        </p>

                        <div className='flex gap-6 items-center'>
                            <p className='text-base text-zinc-800'>
                                <span className='font-bold'>{produtos.length}</span> produtos encontrados
                            </p>
                            <div className='flex gap-1 items-center'>
                                <label htmlFor="ordenacao">Ordenar por:</label>
                                <select
                                    className='p-1 rounded-md bsPadrao'
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value)}
                                >
                                    <option value="">Relevância</option>
                                    <option value="nome">Nome (A-Z)</option>
                                    <option value="-nome">Nome (Z-A)</option>
                                    <option value="preco">Menor Valor</option>
                                    <option value="-preco">Maior Valor</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <section className="!auto-cols-[minmax(220px,300px)] !grid-cols-[repeat(auto-fit,minmax(220px,300px))] containerProdutos">
                        {produtos.map((product) => (
                            <Produto key={product._id} product={product} />
                        ))}
                    </section>
                </>
            ) : (
                <div className='flex flex-col h-[50vh]'>
                    <p className='text-base text-zinc-800'>
                        <span className='font-bold'>Você pesquisou por:</span> {query}
                    </p>
                    <p className='text-base sm:text-lg md:text-xl font-semibold text-zinc-800 mt-8'>Nenhum produto encontrado!</p>
                    <p className='text-base sm:text-lg md:text-xl text-zinc-800'>Tente novamente com outro termo para busca.</p>
                </div>
            )}
        </main>
    );
};

export default Busca;
