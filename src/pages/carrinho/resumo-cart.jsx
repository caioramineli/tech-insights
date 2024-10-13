import "./resumo-cart-style.css";
import { useEffect } from "react";
import { useCarrinho } from "../../contexts/contex-Cart";
import Separador from "../../components/Separador";

export default function ResumoCart() {
    const { calcularValorTotal, desconto, frete, calcularValorFinal, formaPagamento } = useCarrinho();

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
                    <p className="font-semibold">{formatarPreco(calcularValorTotal)}</p>
                </div>

                <Separador />

                <div>
                    <p>Descontos:</p>
                    <p className={desconto > 0 ? 'text-emerald-600 font-semibold' : 'text-zinc-900 font-semibold'}>
                        {desconto > 0 ? `- ${formatarPreco(desconto)}` : formatarPreco(desconto)}
                    </p>
                </div>

                <Separador />

                <div>
                    <p>Frete:</p>
                    <p className="font-semibold text-zinc-900">{frete?.valor ? formatarPreco(frete.valor) : formatarPreco(0)}</p>
                </div>

                {(formaPagamento === 'Cartão' || formaPagamento === 'Mercado Pago' || formaPagamento === '') && (
                    <>
                        <Separador />
                        <div>
                            <p>Valor Total à prazo:</p>
                            <p className="font-semibold text-zinc-900">{formatarPreco(calcularValorFinal)}</p>
                        </div>
                    </>
                )}

                {(formaPagamento === 'PIX' || formaPagamento === 'Boleto' || formaPagamento === '') && (
                    <>
                        <Separador />
                        <div>
                            <p>Valor Total à vista:</p>
                            <p className={formaPagamento ? 'text-emerald-600 font-semibold' : 'text-zinc-900 font-semibold'}>
                                {formatarPreco(
                                    ((calcularValorFinal - (frete?.valor || 0)) * 0.9) + (frete?.valor || 0)
                                )}
                            </p>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
