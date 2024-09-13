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


export default function Confirmacao() {
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
                        <h1>Confirmação</h1>
                        <section className="containerResumoFinalizar">
                            <ResumoCart />
                            <Link to="/confirmacao">
                                <button type="button">Continuar</button>
                            </Link>
                        </section>
                    </>
                )}
            </main>
        </>
    );
}
