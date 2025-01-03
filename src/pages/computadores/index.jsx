import { BuscaContainer } from "../../components/Busca";
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../components/Loading';

const ComputadoresPage = () => {
    const [produtos, setProdutos] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [loading, setLoading] = useState(true);
    const api = process.env.REACT_APP_API_URL;

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const categorias = ["Escritorio", "profissional", "gamer"];
            const response = await axios.post(`${api}listar-grupo-produtos?sort=${sortOption}`, { categorias });
            setProdutos(response.data);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        } finally {
            setLoading(false);
        }
    }, [sortOption, api]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (loading) {
        return <Loading />
    }

    return (
        <BuscaContainer produtos={produtos} subtitulo="Computadores" sortOption setSortOption={setSortOption} />
    );
};

export { ComputadoresPage };