import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/Loading';
import { BuscaContainer } from '../../components/Busca';

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
                const response = await axios.get(`${api}buscar-produtos?q=${query}&sort=${sortOption}`);
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
        <BuscaContainer produtos={produtos} titulo='Você pesquisou por' subtitulo={query} sortOption={sortOption} setSortOption={setSortOption} />
    );
};

export default Busca;
