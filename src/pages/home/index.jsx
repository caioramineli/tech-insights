import React, { useEffect, useState } from "react";
import axios from "axios";
import Produto from "./Produto";
import Slider from "./slider";
import "./style.css";
import Loading from "../../components/Loading";
import Marca from "../../components/containerMarcas/Marca";

export default function Home() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const api = process.env.REACT_APP_API_URL;

    useEffect(() => {
        async function getProdutos() {
            try {
                const response = await axios.get(api + "product");
                setProdutos(response.data.products);
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
            <hr className='border border-emerald-600 w-full mt-8' />
            <div className="grid gap-3 mt-5">
                <h1 className="text-sm sm:text-base font-bold uppercase">Pesquisar pela marca:</h1>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] lg:grid-cols-5 gap-3 mt-3 mb-3">
                    <Marca  marca="msi"/>
                    <Marca  marca={"gigabyte"}/>
                    <Marca  marca={"asus"}/>
                    <Marca  marca={"cooler-master"}/>
                    <Marca  marca={"kingston"}/>
                    <Marca  marca={"xpg"}/>
                    <Marca  marca={"acer"}/>
                    <Marca  marca={"lg"}/>
                    <Marca  marca={"redragon"}/>
                    <Marca  marca={"hyperX"}/>
                    <Marca  marca={"ASRock"}/>
                    <Marca  marca={"galax"}/>
                    <Marca  marca={"pny"}/>
                    <Marca  marca={"amd"}/>
                    <Marca  marca={"intel"}/>
                </div>
            </div>
            <hr className='border border-emerald-600 w-full mt-5' />
            <section className="containerProdutos">
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
