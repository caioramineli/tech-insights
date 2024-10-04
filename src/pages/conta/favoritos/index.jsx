import { useState, useContext, useEffect } from "react";
import Produto from "../../home/Produto";
import { AuthContext } from "../../../contexts/AuthContext";
import axios from "axios";
import Loading from "../../../components/Loading";
import NenhumFavorito from "./nenhum-favorito";

const PaginaFavoritos = () => {
    const [produtosFavoritos, setProdutosFavoritos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { favoritos } = useContext(AuthContext);
    const api = process.env.REACT_APP_API_URL;

    useEffect(() => {
        if (favoritos.length === 0) {
            setLoading(false);
            return;
        }

        async function getProdutos() {
            try {
                const response = await axios.post(`${api}product/favoritos`, favoritos);
                setProdutosFavoritos(response.data.products);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            } finally {
                setLoading(false);
            }
        }

        getProdutos();
    }, [api, favoritos]);

    if (loading) {
        return <Loading />;
    }

    if (favoritos.length === 0) {
        return <NenhumFavorito />;
    }

    return (
        <main className="containerMainPaginaProdutos">
            <section className="containerProdutos">
                {produtosFavoritos.map((product) => (
                    <Produto key={product._id} product={product} />
                ))}
            </section>
        </main>
    );
};

export default PaginaFavoritos;
