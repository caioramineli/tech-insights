import "./resumo-cart-style.css";
import { useEffect } from "react";
import { useCarrinho } from "../../contexts/contex-Cart";
import Separador from "../../components/Separador";

export default function ResumoCart() {
    const { calcularValorTotal, desconto, frete, calcularValorFinal, freteSelecionado } = useCarrinho();

    useEffect(() => {
    }, [calcularValorTotal, desconto, frete]);

    return (
        <section className="containerResumo">
            <h2 className="font-bold text-xl">Resumo</h2>
            <div className="resumoCarrinho">
                <div>
                    <p>Valor do carrinho:</p>
                    <p>{calcularValorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>

                <Separador />

                <div>
                    <p>Descontos:</p>
                    <p>{desconto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>

                <Separador />

                <div>
                    <p>Frete:</p>
                    <p>{frete[freteSelecionado]?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>

                <Separador />

                <div>
                    <p>Valor Total a prazo:</p>
                    <p>{calcularValorFinal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>

                <Separador />

                <div>
                    <p>Valor Total à vista:</p>
                    <p>{(((calcularValorFinal - frete[freteSelecionado]) * 0.9) + frete[freteSelecionado]).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>
            </div>
        </section>
    );
}

