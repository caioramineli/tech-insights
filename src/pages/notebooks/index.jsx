import { useEffect, useState } from 'react';
import axios from 'axios';
import Produto from '../home/Produto';
import Loading from '../../components/Loading';

function Notebooks() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const api = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await axios.get(`${api}produtos/categoria/notebook`);
                setProdutos(response.data);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProdutos();
    }, [api]);

    if (loading) {
        return <Loading />;
    }

    return (
        <main className="containerMainPaginaProdutos !min-h-[50vh]">
            <h1 className='text-lg text-zinc-950 font-semibold'>Notebooks Disponíveis</h1>
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

export { Notebooks };