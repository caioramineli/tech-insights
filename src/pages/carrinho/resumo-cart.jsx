import "./resumo-cart-style.css";
import { useState, useEffect } from "react";
import { useCarrinho } from "../../contexts/contex-Cart";

export default function ResumoCart() {
    const { carrinho } = useCarrinho();
    const [valorCarrinho, setValorCarrinho] = useState(0);
    const [desconto, setDescontos] = useState(0);
    const [frete, setFrete] = useState(0);

    useEffect(() => {
        const valorTotal = carrinho.reduce((total, produto) => total + produto.precoPrazo * produto.quantidade, 0);
        setValorCarrinho(valorTotal);
    }, [carrinho]);

    return (
        <section className="containerResumo">
            <h2>Resumo</h2>
            <div className="resumoCarrinho">
                <div>
                    <p>Valor do carrinho:</p>
                    <p>{valorCarrinho.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>

                <hr />

                <div>
                    <p>Descontos:</p>
                    <p>{desconto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>

                <hr />

                <div>
                    <p>Frete:</p>
                    <p>{frete.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>

                <hr />

                <div>
                    <p>Valor Total a prazo:</p>
                    <p>{(valorCarrinho - desconto + frete).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>

                <hr />

                <div>
                    <p>Valor Total à vista:</p>
                    <p>{(valorCarrinho * 0.9).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>
            </div>
        </section>
    );
}
