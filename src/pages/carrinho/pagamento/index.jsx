import ResumoCart from "../resumo-cart";
import { useCarrinho } from '../../../contexts/contex-Cart';
import 'react-toastify/dist/ReactToastify.css';
import CarrinhoVazio from "../carrinhoVazio";
import StepBar from "../step-bar";
import { FaPix } from "react-icons/fa6";
import { IoIosRemoveCircleOutline, IoMdRadioButtonOff, IoMdRadioButtonOn } from "react-icons/io";
import { SiMercadopago } from "react-icons/si";
import { FaBarcode, FaRegCreditCard } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FormCartao } from "./formCartao";
import { useState } from "react";
import NavegacaoCarrinho from "../../../components/NavegacaoCarrinho";
import FormaPagamento from "../../../components/FormaPagamentoOption";

export default function Pagamento() {
    const { carrinho, frete, calcularValorFinal, formaPagamento, setFormaPagamento, cartao, setCartao } = useCarrinho();
    const [dadosCartao, setDadosCartao] = useState({
        numero: '',
        nomeTitular: '',
        validade: '',
        cvv: '',
        cpfTitular: '',
        parcelas: '1x',
        status: false
    });

    const notifyError = (message) => toast.error(message);
    const navigate = useNavigate();

    function formatarPreco(preco) {
        return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }

    function alterarFormaPagamento(forma) {
        setFormaPagamento(forma)
    }

    function limparDadosCartao() {
        setDadosCartao({
            numero: '',
            nomeTitular: '',
            validade: '',
            cvv: '',
            cpfTitular: '',
            parcelas: '1x',
            status: false
        });
    }

    function removerCartao() {
        limparDadosCartao()
        setCartao(null);
    }

    const verificarFromaPagamento = () => {
        if (formaPagamento === "") {
            notifyError('Escolha uma forma de pagamento!');
            return;
        }

        if (formaPagamento === "Cartão") {
            if (cartao.status === false) {
                notifyError('Informe os dados do cartão!');
                return;
            }
        }
        navigate('/confirmacao');
    };

    function getUltimos4Digitos(numeroCartao) {
        return numeroCartao.slice(-4);
    }

    return (
        <>
            <ToastContainer />
            <main className="flex flex-col w-full gap-4">
                {carrinho.length === 0 ? (
                    <CarrinhoVazio />
                ) : (
                    <>
                        <StepBar step={4} />
                        <div className="flex flex-col lg:flex-row lg:gap-4 xl:gap-8 w-[90%] xl:w-4/5 m-auto min-h-[52vh] max-w-[1300px] justify-between mb-6">
                            <section className="flex flex-col gap-5 mb-4 w-full">
                                <div className="flex flex-col bg-white bsPadrao rounded-lg p-4 gap-3">
                                    <h2 className="text-base sm:text-lg font-bold text-emerald-600 uppercase">Escolha a forma de pagamento</h2>

                                    <hr />

                                    <FormaPagamento
                                        formaPagamento={formaPagamento}
                                        tipo="PIX"
                                        onClick={() => { alterarFormaPagamento('PIX'); limparDadosCartao(); }}
                                        icone={<FaPix className={formaPagamento === 'PIX' ? 'text-2xl sm:text-3xl text-teal-600' : 'text-2xl sm:text-3xl text-zinc-500'} />}
                                        descricao="Pague com PIX"
                                        desconto={formatarPreco(((calcularValorFinal - frete.valor) * 0.9) + frete.valor) + " com desconto à vista no pix"}
                                    />

                                    <FormaPagamento
                                        formaPagamento={formaPagamento}
                                        tipo="Boleto"
                                        onClick={() => { alterarFormaPagamento('Boleto'); limparDadosCartao(); }}
                                        icone={<FaBarcode className={formaPagamento === 'Boleto' ? 'text-2xl sm:text-3xl text-zinc-900' : 'text-2xl sm:text-3xl text-zinc-500'} />}
                                        descricao="Pague com Boleto"
                                        desconto={formatarPreco(((calcularValorFinal - frete.valor) * 0.9) + frete.valor) + " com desconto à vista no boleto"}
                                    />

                                    <div
                                        onClick={() => alterarFormaPagamento('Cartão')}
                                        className={`border-emerald-600 flex flex-col border px-3 sm:px-4 py-2 rounded-md cursor-pointer ${formaPagamento !== 'Cartão' ? 'border-zinc-300' : ''}`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2 sm:gap-4">
                                                <IoMdRadioButtonOn className={formaPagamento === 'Cartão' ? 'text-2xl sm:text-3xl text-emerald-600' : 'hidden'} />
                                                <IoMdRadioButtonOff className={formaPagamento !== 'Cartão' ? 'text-2xl sm:text-3xl' : 'hidden'} />
                                                <div className="flex flex-col">
                                                    <p className="text-sm sm:text-base font-semibold">Pague com Cartão</p>
                                                    <p className="text-xs sm:text-sm">10x de {formatarPreco(calcularValorFinal / 10)} sem juros</p>
                                                </div>
                                            </div>
                                            <FaRegCreditCard className={formaPagamento === 'Cartão' ? 'text-2xl sm:text-3xl text-cyan-700' : 'text-2xl sm:text-3xl text-zinc-500'} />
                                        </div>

                                        {formaPagamento === 'Cartão' && (
                                            <div className="flex flex-col">
                                                <hr className="my-2" />
                                                {cartao !== null && cartao.status ? (
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="text-emerald-600 text-lg font-semibold p-1">Cartão final {getUltimos4Digitos(cartao.numero)} salvo!</h3>
                                                        <button onClick={removerCartao} className="flex items-center gap-1 p-1 duration-200 hover:bg-zinc-300 rounded-md text-red-700">
                                                            <IoIosRemoveCircleOutline className="text-lg" />
                                                            Remover Cartão
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <h3 className="text-base font-semibold mb-1 p-1">Dados do Cartão</h3>
                                                        <FormCartao dadosCartao={dadosCartao} setDadosCartao={setDadosCartao} />
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <FormaPagamento
                                        formaPagamento={formaPagamento}
                                        tipo="Mercado Pago"
                                        onClick={() => { alterarFormaPagamento('Mercado Pago'); limparDadosCartao(); }}
                                        icone={<SiMercadopago className={formaPagamento === 'Mercado Pago' ? 'text-2xl sm:text-3xl text-sky-700' : 'text-2xl sm:text-3xl text-zinc-500'} />}
                                        descricao="Pague com Mercado pago"
                                        desconto={formatarPreco(calcularValorFinal) + " - pague via Mercado Pago"}
                                    />
                                </div>

                                <NavegacaoCarrinho
                                    onClick={verificarFromaPagamento}
                                    linkVoltar="/entrega"
                                    textoVoltar="Voltar para a entrega"
                                    textoContinuar="Continuar para confirmação"
                                    responsivo="hidden lg:flex"
                                />
                            </section>

                            <section className="flex flex-col gap-4 max-lg:mt-1">
                                <ResumoCart />
                                <NavegacaoCarrinho
                                    onClick={verificarFromaPagamento}
                                    linkVoltar="/entrega"
                                    textoVoltar="Voltar"
                                    textoContinuar="Continuar para confirmação"
                                    responsivo="flex lg:hidden"
                                />
                            </section>
                        </div>
                    </>
                )}
            </main >
        </>
    );
}