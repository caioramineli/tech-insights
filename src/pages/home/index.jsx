import React, { useEffect, useState } from "react";
import axios from "axios";
import Produto from "./Produto";
import Slider from "./slider";
import "./style.css";
import Loading from "../../components/Loading";

export default function Home() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProdutos() {
            try {
                const response = await axios.get("https://backend-tech-insights.onrender.com/product");
                setProdutos(response.data.products);

            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchProdutos();
    }, []);

    if (loading) {
        return <Loading />;
    }


    return (
        <main className="containerMainPaginaProdutos">
            <Slider />
            <section className="containerProdutos">
                {produtos.map((product) => (
                    <Produto
                        key={product._id}
                        product={product}
                    />
                ))}

                {produtos.map((product) => (
                    <Produto
                        key={product._id}
                        product={product}
                    />
                ))}
            </section>
        </main>
    );
}
