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
        <section className="flex flex-col items-center min-w-[250px] xl:min-w-[290px] bsPadrao bg-white rounded-md max-lg:mt-6">
            <h2 className="font-bold text-lg lg:text-xl mx-auto border-b border-black/30 w-full flex justify-center p-1 lg:p-[10px]">
                Resumo
            </h2>
            <div className="flex flex-col gap-2 lg:gap-[14px] w-full lg:w-[90%] max-lg:p-3 lg:py-4">
                <div className="flex justify-between !text-sm xl:!text-base">
                    <p>Valor do carrinho:</p>
                    <p className="font-semibold">{formatarPreco(calcularValorTotal)}</p>
                </div>

                <Separador />

                <div className="flex justify-between !text-sm xl:!text-base">
                    <p>Descontos:</p>
                    <p className={desconto > 0 ? 'text-emerald-600 font-semibold' : 'text-zinc-900 font-semibold'}>
                        {desconto > 0 ? `- ${formatarPreco(desconto)}` : formatarPreco(desconto)}
                    </p>
                </div>

                <Separador />

                <div className="flex justify-between !text-sm xl:!text-base">
                    <p>Frete:</p>
                    <p className="font-semibold text-zinc-900">{frete?.valor ? formatarPreco(frete.valor) : formatarPreco(0)}</p>
                </div>

                {(formaPagamento === 'Cartão' || formaPagamento === 'Mercado Pago' || formaPagamento === '') && (
                    <>
                        <Separador />
                        <div className="flex justify-between !text-sm xl:!text-base">
                            <p>Valor Total à prazo:</p>
                            <p className="font-semibold text-zinc-900">{formatarPreco(calcularValorFinal)}</p>
                        </div>
                    </>
                )}

                {(formaPagamento === 'PIX' || formaPagamento === 'Boleto' || formaPagamento === '') && (
                    <>
                        <Separador />
                        <div className="flex justify-between !text-sm xl:!text-base">
                            <p>Valor Total à vista:</p>
                            <p className={formaPagamento ? 'text-emerald-600 font-semibold' : 'text-zinc-900 font-semibold'}>
                                {formatarPreco(
                                    ((calcularValorTotal * 0.9) - desconto + (frete?.valor || 0)
                                )}
                            </p>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
