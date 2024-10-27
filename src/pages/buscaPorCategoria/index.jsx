import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Produto from '../home/Produto';
import axios from 'axios';
import Loading from '../../components/Loading';

const BuscaPorCategoria = () => {
    const [produtos, setProdutos] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [loading, setLoading] = useState(true);
    const api = process.env.REACT_APP_API_URL;

    const { categoria } = useParams();

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            if (categoria) {
                const response = await axios.get(`${api}produtos/categoria/${categoria}?sort=${sortOption}`);
                setProdutos(response.data);
            }
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        } finally {
            setLoading(false);
        }
    }, [categoria, sortOption, api]);

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
                    <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-2'>
                        <p className='text-base text-zinc-800'>
                            <span className='font-bold'>Categoria:</span> {categoria}
                        </p>

                        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-6'>
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
                    <section className="!grid-cols-[repeat(auto-fit,minmax(200px))] containerProdutos">
                        {produtos.map((product) => (
                            <Produto key={product._id} product={product} />
                        ))}
                    </section>
                </>
            ) : (
                <div className='flex flex-col h-[50vh]'>
                    <p className='text-base text-zinc-800'>
                        <span className='font-bold'>Categoria:</span> {categoria}
                    </p>
                    <p className='text-base sm:text-lg md:text-xl font-semibold text-zinc-800 mt-8'>Nenhum produto encontrado!</p>
                    <p className='text-base sm:text-lg md:text-xl text-zinc-800'>Tente novamente com outro termo para busca.</p>
                </div>
            )}
        </main>
    );
};

export { BuscaPorCategoria };
