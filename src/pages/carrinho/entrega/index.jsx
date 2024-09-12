// import { FaTrash } from "react-icons/fa";
import ResumoCart from "../resumo-cart";
import React from 'react';
import { useCarrinho } from '../../../contexts/contex-Cart';
// import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import Loading from "../../../components/Loading";
import { MdShoppingCart } from "react-icons/md";
import StepBar from "../step-bar";
import { FaRegCheckCircle } from "react-icons/fa";


export default function Entrega() {
    const { carrinho } = useCarrinho();

    // const notifySuccess = (text) => toast.success(text);
    // const notifyError = (text) => toast.error(text);



    return (
        <>
            <main className="flex flex-col w-full gap-4">
                {carrinho.length === 0 ? (
                    <div className="carrinhoVazio">
                        <h1 className="text-2xl font-bold">O seu carrinho está vazio</h1>
                        <Link to="/">
                            <button>
                                <MdShoppingCart />
                                Escolher produtos
                            </button>
                        </Link>
                    </div>
                ) : (
                    <>
                        <StepBar />
                        <div className="flex gap-8 w-4/5 m-auto min-h-[42vh] max-w-[1300px] justify-between">
                            <section className="flex flex-col gap-4 w-full">
                                <div className="flex flex-col bg-white bsPadrao rounded-lg p-4 gap-3">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-lg font-bold">Endereço de Entrega</h2>
                                        <button>+ Novo endereço</button>
                                    </div>

                                    <hr />

                                    <div className="flex justify-between items-center border border-zinc-300 p-2 rounded-md">
                                        <div className="flex items-center gap-2">
                                            <FaRegCheckCircle className="text-2xl" />
                                            <div className="flex flex-col">
                                                <h3>Casa Caio</h3>
                                                <p>Rua Vicente Lopes Ramon 764</p>
                                                <p>Centro - Anhumas - SP, 19580-000</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <button>Editar</button>
                                            <button>Excluir</button>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center border border-zinc-300 p-2 rounded-md">
                                        <div className="flex items-center gap-2">
                                            <FaRegCheckCircle className="text-2xl" />
                                            <div className="flex flex-col">
                                                <h3>Casa Caio</h3>
                                                <p>Rua Vicente Lopes Ramon 764</p>
                                                <p>Centro - Anhumas - SP, 19580-000</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <button>Editar</button>
                                            <button>Excluir</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col bg-white bsPadrao rounded-lg p-4 gap-3 mb-4">
                                    <h2 className="text-lg font-bold">Opções de Envio</h2>

                                    <hr />

                                    <div className="flex justify-between items-center border border-zinc-300 p-2 rounded-md">
                                        <div className="flex items-center gap-4">
                                            <FaRegCheckCircle className="text-2xl" />
                                            <span>Expresso</span>
                                        </div>
                                        <span>Entrega em: até 5 dias úteis</span>
                                    </div>

                                    <div className="flex justify-between items-center border border-zinc-300 p-2 rounded-md">
                                        <div className="flex items-center gap-4">
                                            <FaRegCheckCircle className="text-2xl" />
                                            <span>Expresso</span>
                                        </div>
                                        <span>Entrega em: até 5 dias úteis</span>
                                    </div>

                                    <div className="flex justify-between items-center border border-zinc-300 p-2 rounded-md">
                                        <div className="flex items-center gap-4">
                                            <FaRegCheckCircle className="text-2xl" />
                                            <span>Expresso</span>
                                        </div>
                                        <span>Entrega em: até 5 dias úteis</span>
                                    </div>

                                    <div className="flex justify-between items-center border border-zinc-300 p-2 rounded-md">
                                        <div className="flex items-center gap-4">
                                            <FaRegCheckCircle className="text-2xl" />
                                            <span>Expresso</span>
                                        </div>
                                        <span>Entrega em: até 5 dias úteis</span>
                                    </div>
                                </div>
                            </section>

                            <section className="containerResumoFinalizar">
                                <ResumoCart />
                                <button type="button">
                                    <Link to="/pagamento">Continuar</Link>
                                </button>
                            </section>
                        </div>

                    </>
                )}
            </main>
        </>
    );
}