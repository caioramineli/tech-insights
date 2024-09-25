import ResumoCart from "../resumo-cart";
import { useCarrinho } from '../../../contexts/contex-Cart';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Loading from "../../../components/Loading";
import StepBar from "../step-bar";
import CarrinhoVazio from "../carrinhoVazio/index";
import { FaArrowLeft, FaRegCreditCard, FaTruck, FaUser } from "react-icons/fa";
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import TableCart from "../table-cart";

export default function Confirmacao() {
    const { carrinho, zerarCarrinho, calcularValorFinal, frete, freteSelecionado } = useCarrinho();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user } = useContext(AuthContext);


    const notifySuccess = (text) => toast.success(text);
    const notifyError = (text) => toast.error(text);

    const finalizarPedido = async () => {
        const id_user = user.id;

        const produtos = carrinho.map(produto => ({
            id_produto: produto._id,
            quantidade: produto.quantidade
        }));

        const valorFrete = freteSelecionado === 'expresso' ? frete.expresso : frete.normal;

        const pedido = {
            id_user,
            produtos,
            id_endereco: "66c284946ecf469b920f0d8d",
            forma_pagamento: "cartao",
            desconto: 0,
            frete: valorFrete,
            valor_total: calcularValorFinal
        };

        try {
            setIsSubmitting(true);
            const response = await axios.post('https://backend-tech-insights.vercel.app/order', pedido);

            if (response.status === 201) {
                notifySuccess("Pedido realizado!");
                zerarCarrinho();
            } else {
                notifyError("Erro ao finalizar pedido!");
            }
        } catch (error) {
            console.error('Erro ao finalizar o pedido:', error);
            notifyError("Erro ao finalizar pedido");
        } finally {
            setIsSubmitting(false);
        }
    };

    console.log(user);


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
                                    <div className="flex gap-2 items-center">
                                        <FaUser className="text-emerald-700 text-xl" />
                                        <h2 className="text-xl">Dados pessoais</h2>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span>{user.nome}</span>
                                        <span>{user.email}</span>
                                        <span>CPF: {user.cpf}</span>
                                    </div>
                                    <hr />

                                    <div className="grid grid-cols-2">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex gap-2 items-center ">
                                                <FaTruck className="text-emerald-700 text-xl" />
                                                <h2 className="text-xl">Entrega</h2>
                                            </div>
                                            <div className="flex flex-col">
                                                <span>Rua tal, 764, Casa verde</span>
                                                <span>19580-000 - Anhumas - SP</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex gap-2 items-center ">
                                                <FaRegCreditCard className="text-emerald-700 text-xl" />
                                                <h2 className="text-xl">Pagamento</h2>
                                            </div>
                                            <span>PIX</span>
                                        </div>
                                    </div>

                                    <span>Envio normal - R$ 15,00</span>
                                </div>

                                <h1>Lista de produtos</h1>
                                <TableCart />

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
                                {isSubmitting ? (
                                    <div className='flex justify-center h-[3.42rem] items-center'>
                                        <Loading color="#047857" />
                                    </div>
                                ) : (
                                    <button type="button" onClick={finalizarPedido}>Finalizar Pedido</button>
                                )}
                                <ToastContainer />
                            </section>
                        </div>
                    </>
                )}
            </main>
        </>
    );
}
