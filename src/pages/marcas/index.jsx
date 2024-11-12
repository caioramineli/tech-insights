import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Produto from '../home/Produto';
import Loading from '../../components/Loading';

function PaginaMarca() {
    const { marca } = useParams();
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const api = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await axios.get(`${api}listar-produtos-por-marca/${marca}`);
                setProdutos(response.data);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProdutos();
    }, [marca, api]);

    if (loading) {
        return <Loading />;
    }

    return (
        <main className="containerMainPaginaProdutos !min-h-[50vh]">
            <h1 className='text-lg'>Produtos da marca: <span className='uppercase font-semibold'>{marca}</span></h1>
            <section className="!mt-4 containerProdutos">
                {produtos.map((produto) => (
                    <Produto
                        key={produto._id}
                        product={produto}
                    />
                ))}
            </section>
        </main>
    );
}

export { PaginaMarca };
