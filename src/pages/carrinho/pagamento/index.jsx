
import ResumoCart from "../resumo-cart";
import React, { useState } from 'react';
import { useCarrinho } from '../../../contexts/contex-Cart';
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import CarrinhoVazio from "../carrinhoVazio";
import StepBar from "../step-bar";
import { FaPix } from "react-icons/fa6";
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from "react-icons/io";
import { SiMercadopago } from "react-icons/si";
import { FaArrowLeft, FaBarcode, FaRegCreditCard } from "react-icons/fa";



export default function Pagamento() {
    const { carrinho, frete, calcularValorFinal, freteSelecionado } = useCarrinho();
    const [toggle, setToggle] = useState(1);

    function updateToglle(id) {
        setToggle(id);
    }

    function formatarPreco(preco) {
        return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }

    // const notifySuccess = (text) => toast.success(text);
    // const notifyError = (text) => toast.error(text);

    return (
        <>
            <main className="flex flex-col w-full gap-4">
                {carrinho.length === 0 ? (
                    <CarrinhoVazio />
                ) : (
                    <>
                        <StepBar step={4}  />
                        <div className="flex gap-8 w-[90%] xl:w-4/5 m-auto min-h-[52vh] max-w-[1300px] justify-between">
                            <section className="flex flex-col gap-5 mb-4 w-full">
                                <div className="flex flex-col bg-white bsPadrao rounded-lg p-4 gap-3">
                                    <h2 className="text-lg font-bold text-emerald-600 uppercase">Escolha a forma de pagamento</h2>

                                    <hr />

                                    <div onClick={() => updateToglle(1)} className={`border-emerald-600 flex justify-between items-center border px-4 py-2 rounded-md cursor-pointer ${toggle !== 1 ? 'border-zinc-300' : ''}`}>
                                        <div className="flex items-center gap-4">
                                            <IoMdRadioButtonOn className={toggle === 1 ? 'text-3xl text-emerald-600' : 'hidden'} />
                                            <IoMdRadioButtonOff className={toggle !== 1 ? 'text-3xl' : 'hidden'} />
                                            <div className="flex flex-col">
                                                <p className="text-base">Pague com PIX</p>
                                                <p className="text-sm">
                                                    {formatarPreco((((calcularValorFinal - frete[freteSelecionado]) * 0.9) + frete[freteSelecionado]))} com desconto à vista no boleto ou pix
                                                </p>
                                            </div>
                                        </div>

                                        <FaPix className={toggle === 1 ? 'text-3xl text-teal-600' : 'text-3xl text-zinc-500'} />
                                    </div>

                                    <div onClick={() => updateToglle(2)} className={`border-emerald-600 flex justify-between items-center border px-4 py-2 rounded-md cursor-pointer ${toggle !== 2 ? 'border-zinc-300' : ''}`}>
                                        <div className="flex items-center gap-4">
                                            <IoMdRadioButtonOn className={toggle === 2 ? 'text-3xl text-emerald-600' : 'hidden'} />
                                            <IoMdRadioButtonOff className={toggle !== 2 ? 'text-3xl' : 'hidden'} />
                                            <div className="flex flex-col">
                                                <p className="text-base">Pague com Boleto</p>
                                                <p className="text-sm">
                                                    {formatarPreco((((calcularValorFinal - frete[freteSelecionado]) * 0.9) + frete[freteSelecionado]))} com desconto à vista no boleto ou pix
                                                </p>
                                            </div>
                                        </div>

                                        <FaBarcode className={toggle === 2 ? 'text-3xl text-zinc-900' : 'text-3xl text-zinc-500'} />
                                    </div>

                                    <div onClick={() => updateToglle(3)} className={`border-emerald-600 flex justify-between items-center border px-4 py-2 rounded-md cursor-pointer ${toggle !== 3 ? 'border-zinc-300' : ''}`}>
                                        <div className="flex items-center gap-4">
                                            <IoMdRadioButtonOn className={toggle === 3 ? 'text-3xl text-emerald-600' : 'hidden'} />
                                            <IoMdRadioButtonOff className={toggle !== 3 ? 'text-3xl' : 'hidden'} />
                                            <div className="flex flex-col">
                                                <p className="text-base">Pague com Cartão</p>
                                                <p className="text-sm">
                                                    10x de {formatarPreco(calcularValorFinal / 10)} sem juros
                                                </p>
                                            </div>
                                        </div>

                                        <FaRegCreditCard className={toggle === 3 ? 'text-3xl text-cyan-700' : 'text-3xl text-zinc-500'} />
                                    </div>

                                    <div onClick={() => updateToglle(4)} className={`border-emerald-600 flex justify-between items-center border px-4 py-2 rounded-md cursor-pointer ${toggle !== 4 ? 'border-zinc-300' : ''}`}>
                                        <div className="flex items-center gap-4">
                                            <IoMdRadioButtonOn className={toggle === 4 ? 'text-3xl text-emerald-600' : 'hidden'} />
                                            <IoMdRadioButtonOff className={toggle !== 4 ? 'text-3xl' : 'hidden'} />
                                            <div className="flex flex-col">
                                                <p className="text-base">Pague com Mercado pago</p>
                                                <p className="text-sm">
                                                    {formatarPreco(calcularValorFinal)} - pague via Mercado Pago
                                                </p>
                                            </div>
                                        </div>

                                        <SiMercadopago className={toggle === 4 ? 'text-3xl text-sky-700' : 'text-3xl text-zinc-500'} />
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <Link to="/entrega">
                                        <button className="flex items-center gap-2 p-2 hover:bg-zinc-300 duration-200 rounded-md">
                                            <FaArrowLeft />
                                            <span className="uppercase text-sm">Voltar para o carrinho</span>
                                        </button>
                                    </Link>
                                    <Link to="/confirmacao">
                                        <button className="bg-emerald-600 hover:bg-emerald-700 duration-200 p-2 rounded-md text-emerald-50 font-bold" type="button">Continuar para pagamento</button>
                                    </Link>
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