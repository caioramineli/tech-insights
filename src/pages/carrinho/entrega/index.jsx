import ResumoCart from "../resumo-cart";
import React from 'react';
import { useCarrinho } from '../../../contexts/contex-Cart';
// import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import Loading from "../../../components/Loading";
import StepBar from "../step-bar";
import { FaPencilAlt, FaTrash, FaCheckCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import CarrinhoVazio from "../carrinhoVazio";




export default function Entrega() {
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
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-lg font-bold text-emerald-600">Endereço de Entrega</h2>
                                        <button className="flex items-center gap-1 bg-emerald-600 text-teal-50 p-2 rounded-md font-bold"><FaPlus /> Novo endereço</button>
                                    </div>

                                    <hr />

                                    <div className="flex justify-between items-center border border-zinc-300 px-4 py-2 rounded-md">
                                        <div className="flex items-center gap-4">
                                            <FaCheckCircle className="text-2xl" />
                                            <div className="flex flex-col">
                                                <h3 className="font-bold text-base">Casa Caio</h3>
                                                <p className="text-base">Rua Vicente Lopes Ramon 764</p>
                                                <p className="text-sm">Centro - Anhumas - SP, 19580-000</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <button className="flex items-center border border-zinc-300 px-3 py-2 rounded-md gap-2 text-sm">
                                                <FaPencilAlt />
                                                Editar
                                            </button>
                                            <button className="flex items-center border border-zinc-300 px-3 py-2 rounded-md gap-2 text-sm">
                                                <FaTrash />
                                                Excluir
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center border border-zinc-300 px-4 py-2 rounded-md">
                                        <div className="flex items-center gap-4">
                                            <FaCheckCircle className="text-2xl" />
                                            <div className="flex flex-col">
                                                <h3 className="font-bold text-base">Casa Caio</h3>
                                                <p className="text-base">Rua Vicente Lopes Ramon 764</p>
                                                <p className="text-sm">Centro - Anhumas - SP, 19580-000</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <button className="flex items-center border border-zinc-300 px-3 py-2 rounded-md gap-2 text-sm">
                                                <FaPencilAlt />
                                                Editar
                                            </button>
                                            <button className="flex items-center border border-zinc-300 px-3 py-2 rounded-md gap-2 text-sm">
                                                <FaTrash />
                                                Excluir
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col bg-white bsPadrao rounded-lg p-4 gap-3 mb-4">
                                    <h2 className="text-lg font-bold">Opções de Envio</h2>

                                    <hr />

                                    <div className="flex justify-between items-center border border-zinc-300 p-4 rounded-md">
                                        <div className="flex items-center gap-4">
                                            <FaCheckCircle className="text-2xl" />
                                            <span>Expresso</span>
                                        </div>
                                        <span>Entrega em: até 5 dias úteis</span>
                                    </div>

                                    <div className="flex justify-between items-center border border-zinc-300 p-4 rounded-md">
                                        <div className="flex items-center gap-4">
                                            <FaCheckCircle className="text-2xl" />
                                            <span>Expresso</span>
                                        </div>
                                        <span>Entrega em: até 5 dias úteis</span>
                                    </div>

                                    <div className="flex justify-between items-center border border-zinc-300 p-4 rounded-md">
                                        <div className="flex items-center gap-4">
                                            <FaCheckCircle className="text-2xl" />
                                            <span>Expresso</span>
                                        </div>
                                        <span>Entrega em: até 5 dias úteis</span>
                                    </div>

                                    <div className="flex justify-between items-center border border-zinc-300 p-4 rounded-md">
                                        <div className="flex items-center gap-4">
                                            <FaCheckCircle className="text-2xl" />
                                            <span>Expresso</span>
                                        </div>
                                        <span>Entrega em: até 5 dias úteis</span>
                                    </div>
                                </div>
                            </section>

                            <section className="containerResumoFinalizar">
                                <ResumoCart />
                                <Link to="/pagamento">
                                    <button type="button">Continuar</button>
                                </Link>
                            </section>
                        </div>

                    </>
                )}
            </main>
        </>
    );
}