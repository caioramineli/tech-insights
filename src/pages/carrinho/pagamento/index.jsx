
import ResumoCart from "../resumo-cart";
import React from 'react';
import { useCarrinho } from '../../../contexts/contex-Cart';
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import CarrinhoVazio from "../carrinhoVazio";
import StepBar from "../step-bar";
import { FaPix } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import pix from "../../../assets/pixIcon.png"

export default function Pagamento() {
    const { carrinho } = useCarrinho();

    // const notifySuccess = (text) => toast.success(text);
    // const notifyError = (text) => toast.error(text);

    return (
        <>
            <main className="flex flex-col w-full gap-4">
                {carrinho.length === 0 ? (
                    <CarrinhoVazio />
                ) : (
                    <>
                        <StepBar />
                        <div className="flex gap-8 w-4/5 m-auto min-h-[42vh] max-w-[1300px] justify-between">
                            <section className="flex flex-col gap-4 w-full">
                                <div className="flex flex-col bg-white bsPadrao rounded-lg p-4 gap-3">
                                    <h2 className="text-lg font-bold text-emerald-600 uppercase">Escolha a forma de pagamento</h2>

                                    <hr />

                                    <div className="flex justify-between items-center border border-zinc-300 px-4 py-2 rounded-md">
                                        <div className="flex items-center gap-4">
                                            <img src={pix} alt="pix" className="w-12" />
                                            <div className="flex flex-col">
                                                <p className="text-base">Pague com PIX</p>
                                                <p className="text-sm">*precoTotal* com desconto à vista no boleto ou pix</p>
                                            </div>
                                        </div>
                                        <FaCheckCircle className="text-2xl" />
                                    </div>
                                </div>
                            </section>

                            <section className="containerResumoFinalizar">
                                <ResumoCart />
                                <Link to="/confirmacao">
                                    <button type="button">Continuar</button>
                                </Link>
                            </section>
                        </div>

                    </>
                )}
            </main >
        </>
    );
}