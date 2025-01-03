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
    const { productId } = useParams();
    const [productData, setProductData] = useState(null);
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openAccordion, setOpenAccordion] = useState(false)
    const api = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const getProductData = async () => {
            try {
                const response = await axios.get(`${api}listar-produto/${productId}`);
                setProductData(response.data.product);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getProductData();
    }, [productId, api]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>Erro ao carregar o produto: {error}</div>;
    }

    return (
        <main className='containerPaginaProduto'>
            <section className="containerMainProduto">
                <Produto product={productData} rating={rating} setOpenAccordion={setOpenAccordion} />
            </section>

            <DescricaoProduto descricao={productData.descricao} />
            <EspecificacaoProduto especificacoes={productData.especificacoes} />
            <AvaliacoesProduto produto={productData} setNotaMedia={setRating} accordion={openAccordion} setOpenAccordion={setOpenAccordion} />
        </main>
    );
}