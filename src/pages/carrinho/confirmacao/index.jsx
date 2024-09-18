// import { FaTrash } from "react-icons/fa";
import ResumoCart from "../resumo-cart";
import React from 'react';
import { useCarrinho } from '../../../contexts/contex-Cart';
// import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import Loading from "../../../components/Loading";
import StepBar from "../step-bar";
import CarrinhoVazio from "../carrinhoVazio/index";
import { FaArrowLeft } from "react-icons/fa";


export default function Confirmacao() {
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
                        <StepBar step={5} />
                        <div className="flex gap-8 w-[90%] xl:w-4/5 m-auto min-h-[52vh] max-w-[1300px] justify-between">
                            <section className="flex flex-col gap-5 mb-4 w-full">
                                <div className="flex flex-col bg-white bsPadrao rounded-lg p-4 gap-3">
                                    <h1>Confirmação</h1>
                                </div>

                                <div className="flex justify-between">
                                    <Link to="/pagamento">
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
            </main>
        </>
    );
}
