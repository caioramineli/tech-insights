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
import ContainerCarrinhoMobile from "../../components/ContainerCarrinhoMobile";

export default function Carrinho() {
    const { carrinho, zerarCarrinho, frete, escolhaFrete, removerProduto } = useCarrinho();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    function verificarLogin() {
        if (user) {
            navigate('/entrega')
        } else {
            navigate('/login')
        }
    }

    function irParaEntrega() {
        if (frete.valor === 0) {
            escolhaFrete('normal')
        }
        verificarLogin()
    }

    return (
        <>
            <main className="mainCarrinho">
                {carrinho.length === 0 ? (
                    <CarrinhoVazio />
                ) : (
                    <>
                        <StepBar />
                        <div className="flex flex-col lg:flex-row lg:gap-4 xl:gap-8 w-[90%] xl:w-4/5 m-auto min-h-[42vh] max-w-[1300px]">
                            <section className="containerPrincipal">
                                <TableCart />

                                <div className="flex sm:hidden flex-col bg-white bsPadrao rounded-md">
                                    {carrinho.map((produto, index) => (
                                        <ContainerCarrinhoMobile
                                            produto={produto}
                                            index={index}
                                            removerProduto={removerProduto}
                                            esconder="flex"
                                        />
                                    ))}
                                </div>

                                <div className="limparCarrinho text-sm sm:text-base" onClick={() => zerarCarrinho()}>
                                    <FaTrash />
                                    <h3>Limpar carrinho</h3>
                                </div>

                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-2">
                                    <Cupom />
                                    <Frete />
                                </div>
                            </section>

                            <section className="flex flex-col gap-4 max-lg:mt-4">
                                <ResumoCart />
                                <button className="btnPadrao !text-lg !font-bold" onClick={irParaEntrega}>Continuar</button>
                            </section>

                        </div>
                        <ToastContainer />
                    </>
                )}
            </main>
        </>
    );
}
