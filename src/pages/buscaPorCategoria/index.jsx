import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/Loading';
import { BuscaContainer } from '../../components/Busca';

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
        <BuscaContainer produtos={produtos} subtitulo={categoria} sortOption setSortOption={setSortOption} />
    );
};

export { BuscaPorCategoria };
