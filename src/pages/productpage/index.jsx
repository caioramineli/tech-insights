import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './style.css';
import Produto from './produtoCompra';
import DescricaoProduto from '../../components/DescricaoProduto';
import EspecificacaoProduto from '../../components/EspecificacaoProduto';
import AvaliacoesProduto from '../../components/AvaliacoesProduto';
import Loading from '../../components/Loading';

export default function PaginaProduto() {
    const { productId } = useParams(); // Obter productId da URL
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await axios.get(`https://backend-tech-insights.onrender.com/product/${productId}`);
                setProductData(response.data.product);
                console.log(response.data.product);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [productId]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>Erro ao carregar o produto: {error}</div>;
    }

    return (
        <main className='containerPaginaProduto'>
            <section className="containerMainProduto">
                <Produto product={productData} />
            </section>

            <DescricaoProduto descricao={productData.descricao} />
            <EspecificacaoProduto especificacoes={productData.especificacoes} />
            <AvaliacoesProduto avaliacoes={productData.avaliacoes} />
        </main>
    );
}