import "./style.css";
import { FaTrash } from "react-icons/fa";
import TableCart from "./table-cart";
import ResumoCart from "./resumo-cart";
import React, { useContext } from 'react';
import { useCarrinho } from '../../contexts/contex-Cart';
import { AuthContext } from '../../contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Cupom from "./cupom";
import StepBar from "./step-bar";
import Frete from "./frete";
import CarrinhoVazio from "./carrinhoVazio";

export default function Carrinho() {
    const { carrinho, zerarCarrinho } = useCarrinho();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    function verificarLogin() {
        if (user) {
            navigate('/entrega')
        } else {
            navigate('/login')
        }
    }

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
