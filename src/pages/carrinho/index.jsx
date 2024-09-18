import "./style.css";
import { FaTrash } from "react-icons/fa";
import TableCart from "./table-cart";
import ResumoCart from "./resumo-cart";
import React, { useContext, useState } from 'react';
import { useCarrinho } from '../../contexts/contex-Cart';
import { AuthContext } from '../../contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import Loading from "../../components/Loading";
import Cupom from "./cupom";
import StepBar from "./step-bar";
import Frete from "./frete";
import CarrinhoVazio from "./carrinhoVazio";

export default function Carrinho() {
    // const [isSubmitting, setIsSubmitting] = useState(false);
    const { carrinho, zerarCarrinho, calcularValorFinal, frete, freteSelecionado } = useCarrinho();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    function verificarLogin() {
        if (user) {
            navigate('/entrega')
        } else {
            navigate('/login')
        }
    }

    // const notifySuccess = (text) => toast.success(text);
    // const notifyError = (text) => toast.error(text);

    // const finalizarPedido = async () => {
    //     const id_user = user.id;

    //     const produtos = carrinho.map(produto => ({
    //         id_produto: produto._id,
    //         quantidade: produto.quantidade
    //     }));

    //     const valorFrete = freteSelecionado === 'expresso' ? frete.expresso : frete.normal;

    //     const pedido = {
    //         id_user,
    //         produtos,
    //         id_endereco: "66c284946ecf469b920f0d8d",
    //         forma_pagamento: "cartao",
    //         desconto: 0,
    //         frete: valorFrete,
    //         valor_total: calcularValorFinal
    //     };

    //     try {
    //         setIsSubmitting(true);
    //         const response = await axios.post('https://backend-tech-insights.vercel.app/order', pedido);

    //         if (response.status === 201) {
    //             notifySuccess("Pedido realizado!");
    //             zerarCarrinho();
    //         } else {
    //             notifyError("Erro ao finalizar pedido!");
    //         }
    //     } catch (error) {
    //         console.error('Erro ao finalizar o pedido:', error);
    //         notifyError("Erro ao finalizar pedido");
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };

    return (
        <>
            <main className="mainCarrinho">
                {carrinho.length === 0 ? (
                    <CarrinhoVazio />
                ) : (
                    <>
                        <StepBar />
                        <div className="flex gap-8 w-[90%] xl:w-4/5 m-auto min-h-[42vh] max-w-[1300px]">
                            <section className="containerPrincipal">
                                <TableCart />

                                <div className="limparCarrinho" onClick={() => zerarCarrinho()}>
                                    <FaTrash />
                                    <h3>Limpar carrinho</h3>
                                </div>

                                <div className="flex items-start justify-between gap-2">
                                    <Cupom />
                                    <Frete />
                                </div>
                            </section>
                            <section className="containerResumoFinalizar">
                                <ResumoCart />

                                <button type="button" onClick={verificarLogin}>Continuar</button>
                            </section>
                        </div>
                        <ToastContainer />
                    </>
                )}
            </main>
        </>
    );
}
