import { useState, useContext, useEffect } from "react";
import Produto from "../../home/Produto";
import { AuthContext } from "../../../contexts/AuthContext";
import axios from "axios";
import Loading from "../../../components/Loading";
import { FaHeart } from "react-icons/fa";
import NenhumFavorito from "./nenhum-favorito";
import VoltarMinhaConta from "../../../components/VoltarMinhaConta";

const PaginaFavoritos = () => {
    const [produtosFavoritos, setProdutosFavoritos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { favoritos, token } = useContext(AuthContext);
    const api = process.env.REACT_APP_API_URL;

    useEffect(() => {
        if (favoritos.length === 0) {
            setLoading(false);
            return;
        }

        async function getProdutos() {
            try {
                const response = await axios.post(`${api}listar-favoritos`, favoritos, { headers: { 'Authorization': `Bearer ${token}` } });
                setProdutosFavoritos(response.data.produtos);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            } finally {
                setLoading(false);
            }
        }

        getProdutos();
    }, [api, favoritos, token]);

    if (loading) {
        return <Loading />;
    }

    if (favoritos.length === 0) {
        return <NenhumFavorito />;
    }

    return (
        <main className="containerMainPaginaProdutos !my-6 sm:!my-8">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <FaHeart className='text-emerald-600 text-2xl sm:text-3xl' />
                    <h1 className="font-bold text-zinc-900 text-lg md:text-2xl">Favoritos</h1>
                </div>
                <VoltarMinhaConta />
            </div>
            <section className="containerProdutos">
                {produtosFavoritos.map((product) => (
                    <Produto key={product._id} product={product} />
                ))}
            </section>
        </main>
    );
};

export default PaginaFavoritos;
