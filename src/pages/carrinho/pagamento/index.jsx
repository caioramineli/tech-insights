import ResumoCart from "../resumo-cart";
import { useCarrinho } from '../../../contexts/contex-Cart';
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import CarrinhoVazio from "../carrinhoVazio";
import StepBar from "../step-bar";
import { FaPix } from "react-icons/fa6";
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from "react-icons/io";
import { SiMercadopago } from "react-icons/si";
import { FaArrowLeft, FaBarcode, FaRegCreditCard } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Pagamento() {
    const { carrinho, frete, calcularValorFinal, formaPagamento, setFormaPagamento } = useCarrinho();

    const notifyError = (message) => toast.error(message);
    const navigate = useNavigate();

    function formatarPreco(preco) {
        return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }

    function alterarFormaPagamento(forma) {
        setFormaPagamento(forma)
    }

    const verificarFromaPagamento = () => {
        if (formaPagamento === "") {
            notifyError('Escolha uma forma de pagamento!');
        } else {
            navigate('/confirmacao');
        }
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
                        <div className="flex gap-8 w-[90%] xl:w-4/5 m-auto min-h-[52vh] max-w-[1300px] justify-between">
                            <section className="flex flex-col gap-5 mb-4 w-full">
                                <div className="flex flex-col bg-white bsPadrao rounded-lg p-4 gap-3">
                                    <h2 className="text-lg font-bold text-emerald-600 uppercase">Escolha a forma de pagamento</h2>

                                    <hr />

                                    <div onClick={() => alterarFormaPagamento('PIX')} className={`border-emerald-600 flex justify-between items-center border px-4 py-2 rounded-md cursor-pointer ${formaPagamento !== 'PIX' ? 'border-zinc-300' : ''}`}>
                                        <div className="flex items-center gap-4">
                                            <IoMdRadioButtonOn className={formaPagamento === 'PIX' ? 'text-3xl text-emerald-600' : 'hidden'} />
                                            <IoMdRadioButtonOff className={formaPagamento !== 'PIX' ? 'text-3xl' : 'hidden'} />
                                            <div className="flex flex-col">
                                                <p className="text-base">Pague com PIX</p>
                                                <p className="text-sm">
                                                    {formatarPreco((((calcularValorFinal - frete.valor) * 0.9) + frete.valor))} com desconto à vista no boleto ou pix
                                                </p>
                                            </div>
                                        </div>

                                        <FaPix className={formaPagamento === 'PIX' ? 'text-3xl text-teal-600' : 'text-3xl text-zinc-500'} />
                                    </div>

                                    <div onClick={() => alterarFormaPagamento('Boleto')} className={`border-emerald-600 flex justify-between items-center border px-4 py-2 rounded-md cursor-pointer ${formaPagamento !== 'Boleto' ? 'border-zinc-300' : ''}`}>
                                        <div className="flex items-center gap-4">
                                            <IoMdRadioButtonOn className={formaPagamento === 'Boleto' ? 'text-3xl text-emerald-600' : 'hidden'} />
                                            <IoMdRadioButtonOff className={formaPagamento !== 'Boleto' ? 'text-3xl' : 'hidden'} />
                                            <div className="flex flex-col">
                                                <p className="text-base">Pague com Boleto</p>
                                                <p className="text-sm">
                                                    {formatarPreco((((calcularValorFinal - frete.valor) * 0.9) + frete.valor))} com desconto à vista no boleto ou pix
                                                </p>
                                            </div>
                                        </div>

                                        <FaBarcode className={formaPagamento === 'Boleto' ? 'text-3xl text-zinc-900' : 'text-3xl text-zinc-500'} />
                                    </div>

                                    <div onClick={() => alterarFormaPagamento('Cartão')} className={`border-emerald-600 flex justify-between items-center border px-4 py-2 rounded-md cursor-pointer ${formaPagamento !== 'Cartão' ? 'border-zinc-300' : ''}`}>
                                        <div className="flex items-center gap-4">
                                            <IoMdRadioButtonOn className={formaPagamento === 'Cartão' ? 'text-3xl text-emerald-600' : 'hidden'} />
                                            <IoMdRadioButtonOff className={formaPagamento !== 'Cartão' ? 'text-3xl' : 'hidden'} />
                                            <div className="flex flex-col">
                                                <p className="text-base">Pague com Cartão</p>
                                                <p className="text-sm">
                                                    10x de {formatarPreco(calcularValorFinal / 10)} sem juros
                                                </p>
                                            </div>
                                        </div>

                                        <FaRegCreditCard className={formaPagamento === 'Cartão' ? 'text-3xl text-cyan-700' : 'text-3xl text-zinc-500'} />
                                    </div>

                                    <div onClick={() => alterarFormaPagamento('Mercado Pago')} className={`border-emerald-600 flex justify-between items-center border px-4 py-2 rounded-md cursor-pointer ${formaPagamento !== 'Mercado Pago' ? 'border-zinc-300' : ''}`}>
                                        <div className="flex items-center gap-4">
                                            <IoMdRadioButtonOn className={formaPagamento === 'Mercado Pago' ? 'text-3xl text-emerald-600' : 'hidden'} />
                                            <IoMdRadioButtonOff className={formaPagamento !== 'Mercado Pago' ? 'text-3xl' : 'hidden'} />
                                            <div className="flex flex-col">
                                                <p className="text-base">Pague com Mercado pago</p>
                                                <p className="text-sm">
                                                    {formatarPreco(calcularValorFinal)} - pague via Mercado Pago
                                                </p>
                                            </div>
                                        </div>

                                        <SiMercadopago className={formaPagamento === 'Mercado Pago' ? 'text-3xl text-sky-700' : 'text-3xl text-zinc-500'} />
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <Link to="/entrega">
                                        <button className="flex items-center gap-2 p-2 hover:bg-zinc-300 duration-200 rounded-md">
                                            <FaArrowLeft />
                                            <span className="uppercase text-sm">Voltar para a entrega</span>
                                        </button>
                                    </Link>
                                    <button onClick={verificarFromaPagamento} className="bg-emerald-600 hover:bg-emerald-700 duration-200 p-2 rounded-md text-emerald-50 font-bold" type="button">Continuar para confirmação</button>
                                </div>
                            </section>

                            <section className="containerResumoFinalizar">
                                <ResumoCart />
                            </section>
                        </div>
                    </>
                )}
            </main >
        </>
    );
}