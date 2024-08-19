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
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Loading from "../../components/Loading";

export default function Carrinho() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { carrinho, zerarCarrinho, calcularValorTotal } = useCarrinho();
    const { user } = useContext(AuthContext);

    const finalizarPedido = async () => {
        if (carrinho.length === 0) {
            toast.error("O carrinho está vazio. Adicione pelo menos um produto antes de finalizar o pedido.");
            return;
        }

        const id_user = user.id;

        const produtos = carrinho.map(produto => ({
            id_produto: produto._id,
            quantidade: produto.quantidade
        }));

        const pedido = {
            id_user,
            produtos,
            id_endereco: "66c284946ecf469b920f0d8d",
            forma_pagamento: "cartao",
            desconto: 0,
            frete: 10,
            valor_total: calcularValorTotal
        };

        const notifySuccess = () => toast.success("Cadastro realizado com sucesso!");
        const notifyError = () => toast.error("Erro ao finalizar o pedido!");

        try {
            setIsSubmitting(true);
            const response = await axios.post('https://backend-tech-insights.onrender.com/order', pedido);

            if (response.status === 201) {
                notifySuccess()
                zerarCarrinho();
            } else {
                notifyError()
            }
        } catch (error) {
            console.error('Erro ao finalizar o pedido:', error);
            notifyError()
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="mainCarrinho">
            <ToastContainer />
            <section className="containerPrincipal">
                <TableCart />
                <div className="limparCarrinho" onClick={() => zerarCarrinho()}>
                    <FaTrash />
                    <h3>Limpar carrinho</h3>
                </div>
                <div className="containerCupomFrete">
                    <div className="cupomDesconto">
                        <input type="text" placeholder="Cupom de desconto" />
                        <button>
                            Aplicar
                            <BiSolidCoupon />
                        </button>
                    </div>
                    <div className="calculoFrete">
                        <input type="text" placeholder="12345-678" />
                        <button>
                            Calcular
                            <FaTruck />
                        </button>
                    </div>
                </div>
            </section>
            <section className="containerResumoFinalizar">
                <ResumoCart />

                {isSubmitting ? (
                    <Loading color='#059669' />
                ) : (
                    <button type="button" onClick={finalizarPedido}>Finalizar Pedido</button>
                )}
            </section>
        </main>
    );
}
