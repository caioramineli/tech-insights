import React, { useEffect, useState } from "react";
import axios from "axios";
import Produto from "./Produto";
import Slider from "./slider";
import "./style.css";
import Loading from "../../components/Loading";
import { ContainerMarcas } from "../../components/ContainerMarcas/index";

export default function Home() {
    const [primeirosProdutos, setPrimeirosProdutos] = useState([]);
    const [restanteProdutos, setRestanteProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const api = process.env.REACT_APP_API_URL;

    useEffect(() => {
        async function getProdutos() {
            try {
                const response = await axios.get(api + "productHome?limite=15");
                setPrimeirosProdutos(response.data.primeirosProdutos);
                setRestanteProdutos(response.data.restanteProdutos);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
            finally {
                setLoading(false);
            }
        }
        getProdutos();
    }, [api]);

    if (loading) {
        return <Loading />;
    }


    return (
        <main className="containerMainPaginaProdutos">
            <Slider />
            <section className="containerProdutos">
                {primeirosProdutos.map((product) => (
                    <Produto
                        key={product._id}
                        product={product}
                    />
                ))}
            </section>
            <hr className='border border-emerald-600 w-full mt-8' />
            <ContainerMarcas />
            <hr className='border border-emerald-600 w-full mt-5' />
            <section className="containerProdutos">
                {restanteProdutos.map((product) => (
                    <Produto
                        key={product._id}
                        product={product}
                    />
                ))}
            </section>
        </main>
    );
}
