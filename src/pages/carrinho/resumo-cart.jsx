import "./resumo-cart-style.css";
import { useEffect } from "react";
import { useCarrinho } from "../../contexts/contex-Cart";
import Separador from "../../components/Separador";

export default function ResumoCart() {
    const { calcularValorTotal, desconto, frete, calcularValorFinal } = useCarrinho();

    function formatarPreco(preco) {
        return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    useEffect(() => {
    }, [calcularValorTotal, desconto, frete]);

    return (
        <section className="containerResumo">
            <h2 className="font-bold text-xl">Resumo</h2>
            <div className="resumoCarrinho">
                <div>
                    <p>Valor do carrinho:</p>
                    <p>{formatarPreco(calcularValorTotal)}</p>
                </div>

                <Separador />

                <div>
                    <p>Descontos:</p>
                    <p>{formatarPreco(desconto)}</p>
                </div>

                <Separador />

                <div>
                    <p>Frete:</p>
                    <p>{frete?.valor ? formatarPreco(frete.valor) : formatarPreco(0)}</p>
                </div>

                <Separador />

                <div>
                    <p>Valor Total a prazo:</p>
                    <p>{formatarPreco(calcularValorFinal)}</p>
                </div>

                <Separador />

                <div>
                    <p>Valor Total à vista:</p>
                    <p>
                        {formatarPreco(
                            ((calcularValorFinal - (frete?.valor || 0)) * 0.9) + (frete?.valor || 0)
                        )}
                    </p>
                </div>
            </div>
        </section>
    );
}
