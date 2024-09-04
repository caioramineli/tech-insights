import "./style.css";
import { FaTrash } from "react-icons/fa";
import { BiSolidCoupon } from "react-icons/bi";
import { FaTruck } from "react-icons/fa6";
import TableCart from "./table-cart";
import ResumoCart from "./resumo-cart";
import React, { useContext, useState } from 'react';
import { useCarrinho } from '../../contexts/contex-Cart';
import { AuthContext } from '../../contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Loading from "../../components/Loading";
import Cupom from "./cupom";
import { MdShoppingCart } from "react-icons/md";
import InputMask from 'react-input-mask';
import StepBar from "./step-bar";

export default function Carrinho() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCalculatingFrete, setIsCalculatingFrete] = useState(false);
    const { carrinho, zerarCarrinho, calcularValorFinal, calcularFrete, frete, freteSelecionado, setFreteSelecionado, atualizarFrete } = useCarrinho();
    const { user } = useContext(AuthContext);
    const [valorCep, setValorCep] = useState('');

    const notifySuccess = (text) => toast.success(text);
    const notifyError = (text) => toast.error(text);

    const handleCalcularFrete = async () => {
        setIsCalculatingFrete(true);

        setTimeout(() => {
            const cep = valorCep.replace(/\D/g, '');
            if (cep.length === 8) {
                calcularFrete();
            } else {
                notifyError("Digite um cep válido!")
                atualizarFrete({ normal: 0, expresso: 0 });
            }

            setIsCalculatingFrete(false);
        }, 1000);
    };

    const handleFreteChange = (e) => {
        setFreteSelecionado(e.target.value);
    };

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
            const response = await axios.post('https://backend-tech-insights.onrender.com/order', pedido);

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

    return (
        <>
            <main className="mainCarrinho">
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
                        <div className="flex gap-8 w-4/5 m-auto min-h-[42vh]">

                            <section className="containerPrincipal">
                                <TableCart />
                                <div className="limparCarrinho" onClick={() => zerarCarrinho()}>
                                    <FaTrash />
                                    <h3>Limpar carrinho</h3>
                                </div>

                                <div className="flex items-start justify-between gap-2">


                                    <Cupom />

                                    <div className="flex flex-col bg-white rounded-md bsPadrao p-4 gap-2">
                                        <h3 className="text-lg font-bold">Calcular Frete e Prazos</h3>
                                        <div className="flex gap-2">
                                            <InputMask
                                                mask="99999-999"
                                                value={valorCep}
                                                onChange={(e) => setValorCep(e.target.value)}
                                            >
                                                {() => (
                                                    <input
                                                        className="border border-zinc-400 rounded-md px-2 w-full outline-none focus:border-cyan-700"
                                                        name="cep"
                                                        type="text"
                                                        placeholder="12345-678"
                                                    />
                                                )}
                                            </InputMask>
                                            <button className="flex items-center gap-2 bg-cyan-600 rounded-md p-2 text-cyan-50" onClick={handleCalcularFrete}>
                                                Calcular
                                                <FaTruck />
                                            </button>
                                        </div>

                                        {isCalculatingFrete ? (
                                            <Loading />
                                        ) : (
                                            frete && frete.normal > 0 && frete.expresso > 0 && ( // Verifica se o frete foi calculado e é maior que 0
                                                <div className="flex flex-col gap-1">
                                                    <label className="flex gap-2">
                                                        <input
                                                            type="radio"
                                                            name="frete"
                                                            value="normal"
                                                            checked={freteSelecionado === 'normal'}
                                                            onChange={handleFreteChange}
                                                        />
                                                        Frete Normal: R$ {frete.normal.toFixed(2)}
                                                    </label>
                                                    <label className="flex gap-2">
                                                        <input
                                                            type="radio"
                                                            name="frete"
                                                            value="expresso"
                                                            checked={freteSelecionado === 'expresso'}
                                                            onChange={handleFreteChange}
                                                        />
                                                        Frete Expresso: R$ {frete.expresso.toFixed(2)}
                                                    </label>
                                                </div>
                                            )
                                        )}

                                    </div>
                                </div>
                            </section>
                            <section className="containerResumoFinalizar">
                                <ResumoCart />
                                {isSubmitting ? (
                                    <Loading />
                                ) : (
                                    <button type="button" onClick={finalizarPedido}>
                                        Finalizar Pedido
                                    </button>
                                )}
                            </section>
                        </div>
                        <ToastContainer />
                    </>
                )}

            </main>
        </>
    );
}
