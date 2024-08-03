import React, { useEffect, useState } from "react";
import axios from "axios";
import Produto from "./Produto";
import Slider from "./slider";
import "./style.css";

export default function Home() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        async function fetchProdutos() {
            try {
                const response = await axios.get("https://backend-tech-insights.vercel.app/product");
                setProdutos(response.data.products);
                console.log(response.data.products);

            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        }
        fetchProdutos();
    }, []);

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
