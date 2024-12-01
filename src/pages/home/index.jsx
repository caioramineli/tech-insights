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
    const [loadingRestante, setLoadingRestante] = useState(true);
    const api = "https://backend-tech-insights-production.up.railway.app/";

    useEffect(() => {
        async function getPrimeirosProdutos() {
            const cache = localStorage.getItem("primeirosProdutos");
            if (cache) {
                setPrimeirosProdutos(JSON.parse(cache));
                setLoading(false);
                getRestanteProdutos();
            } else {
                try {
                    const response = await axios.get(api + "listar-produtos-home?divisao=10");
                    setPrimeirosProdutos(response.data.primeirosProdutos);
                    localStorage.setItem("primeirosProdutos", JSON.stringify(response.data.primeirosProdutos));
                } catch (error) {
                    console.error("Erro ao buscar primeiros produtos:", error);
                } finally {
                    setLoading(false);
                    getRestanteProdutos();
                }
            }
        }

        async function getRestanteProdutos() {
            try {
                const response = await axios.get(api + "listar-produtos-home?divisao=10&start=10");
                setRestanteProdutos(response.data.restanteProdutos);
            } catch (error) {
                console.error("Erro ao buscar restante dos produtos:", error);
            } finally {
                setLoadingRestante(false);
            }
        }

        getPrimeirosProdutos();
    }, [api]);

    return (
        <main className="containerMainPaginaProdutos">
            <Slider />

            {loading ? (
                <div className="flex min-h-[50vh] justify-center items-center">
                    <Loading />
                </div>
            ) : (
                <section className="containerProdutos">
                    {primeirosProdutos.map((product) => (
                        <Produto
                            key={product._id}
                            product={product}
                        />
                    ))}
                </section>
            )}

            <hr className='border border-emerald-600 w-full mt-8' />

            <ContainerMarcas />
            <hr className='border border-emerald-600 w-full mt-5' />

            {loadingRestante ? (
                <div className="flex min-h-[50vh] justify-center items-center">
                    <Loading />
                </div>
            ) : (
                <section className="containerProdutos">
                    {restanteProdutos.map((product) => (
                        <Produto
                            key={product._id}
                            product={product}
                        />
                    ))}
                </section>
            )}
        </main>
    );
}
