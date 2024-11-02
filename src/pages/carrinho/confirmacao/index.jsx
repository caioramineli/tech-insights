import ResumoCart from "../resumo-cart";
import { useCarrinho } from '../../../contexts/contex-Cart';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Loading from "../../../components/Loading";
import StepBar from "../step-bar";
import CarrinhoVazio from "../carrinhoVazio/index";
import { FaArrowLeft, FaRegCreditCard, FaTruck, FaUser, FaBarcode } from "react-icons/fa";
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import TableCart from "../table-cart";
import { MdShoppingCart } from "react-icons/md";
import { FaPix } from "react-icons/fa6";
import { SiMercadopago } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
import ContainerCarrinhoMobile from "../../../components/ContainerCarrinhoMobile";

export default function Confirmacao() {
    const api = process.env.REACT_APP_API_URL;
    const { carrinho, zerarCarrinho, calcularValorFinal, frete, desconto, endereco, formaPagamento, setPedido, cupom, cartao, calcularValorTotal } = useCarrinho();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const notifyError = (text) => toast.error(text);

    const finalizarPedido = async () => {
        const idUser = user.id;

        const produtos = carrinho.map(produto => ({
            idProduto: produto._id,
            quantidade: produto.quantidade
        }));

        let valorFinalCarrinho = calcularValorFinal;
        if (formaPagamento === 'PIX' || formaPagamento === 'Boleto') {
            valorFinalCarrinho = (calcularValorTotal * 0.9) - desconto + frete.valor
        }

        const pedido = {
            idUser,
            produtos,
            idEndereco: endereco._id,
            formaPagamento: formaPagamento,
            desconto: desconto,
            frete: {
                tipo: frete.tipo,
                valor: frete.valor
            },
            valorTotal: valorFinalCarrinho,
            codigoCupom: cupom.codigo,
            status: "Pedido realizado"
        };

        try {
            setIsSubmitting(true);
            const response = await axios.post(api + "order", pedido);
            if (response.status === 201) {
                setPedido(response.data.order);
                navigate('/pedido-realizado', {
                    state: { numeroPedido: response.data.order.numeroPedido, formaPagamento: formaPagamento }
                });
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

    const exibirIconePagamento = () => {
        switch (formaPagamento) {
            case 'PIX':
                return <FaPix className="text-2xl text-teal-600" />;
            case 'Boleto':
                return <FaBarcode className="text-2xl text-zinc-900" />;
            case 'Cartão':
                return <FaRegCreditCard className="text-2xl text-cyan-700" />;
            case 'Mercado Pago':
                return <SiMercadopago className="text-2xl text-sky-700" />;
            default:
                return null;
        }
    };

    return (
        <>
            <ToastContainer />
            <main className="flex flex-col w-full gap-4">
                {carrinho.length === 0 ? (
                    <CarrinhoVazio />
                ) : (
                    <>
                        <StepBar step={5} />
                        <div className="flex flex-col md:flex-row md:gap-4 xl:gap-8 w-[90%] xl:w-4/5 m-auto min-h-[52vh] max-w-[1300px] justify-between">
                            <section className="flex flex-col gap-5 mb-4 w-full">
                                <div className="flex flex-col bg-white bsPadrao rounded-lg p-3 sm:p-4 gap-3">
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex gap-2 items-center">
                                                <FaUser className="text-emerald-700 text-xl" />
                                                <h2 className="text-lg md:text-xl font-medium">Dados pessoais</h2>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm sm:text-base">{user.nome}</span>
                                                <span className="text-sm sm:text-base">{user.email}</span>
                                                <span className="text-base">CPF: {user.cpf}</span>
                                            </div>
                                        </div>
                                        <hr className="block sm:hidden"/>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex gap-2 items-center ">
                                                <FaTruck className="text-emerald-700 text-xl" />
                                                <h2 className="text-lg md:text-xl font-medium">Entrega</h2>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm sm:text-base">{endereco.rua}, {endereco.numero}, {endereco.complemento}</span>
                                                <span className="text-sm sm:text-base">{endereco.cep} - {endereco.cidade} - {endereco.estado}</span>
                                            </div>
                                            <span className="font-medium">Envio {frete.tipo} - R$ {frete.valor},00</span>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-2 items-center ">
                                            <FaRegCreditCard className="text-emerald-700 text-xl" />
                                            <h2 className="text-lg md:text-xl font-medium">Pagamento</h2>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <span className="text-sm sm:text-base">
                                                Pague com {formaPagamento}
                                                {formaPagamento === 'Cartão' ? ` em ${cartao.parcelas}` : ''}
                                            </span>
                                            {exibirIconePagamento()}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <MdShoppingCart className="text-emerald-700 text-xl" />
                                        <h1 className="text-lg md:text-xl">Lista de produtos</h1>
                                    </div>
                                    <TableCart esconderBtns="hidden" />
                                    <div className="flex sm:hidden flex-col bg-white bsPadrao rounded-md">
                                        {carrinho.map((produto, index) => (
                                            <ContainerCarrinhoMobile
                                                produto={produto}
                                                index={index}
                                                esconder="hidden"
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="hidden md:flex justify-between">
                                    <Link to="/pagamento">
                                        <button className="flex items-center gap-2 p-2 hover:bg-zinc-300 duration-200 rounded-md">
                                            <FaArrowLeft />
                                            <span className="uppercase text-sm">Voltar para o pagamento</span>
                                        </button>
                                    </Link>
                                </div>
                            </section>
                            <section className="flex flex-col gap-4 max-lg:mt-1 mb-6">
                                <ResumoCart />
                                {isSubmitting ? (
                                    <div className='flex justify-center h-[3.42rem] items-center'>
                                        <Loading color="#047857" />
                                    </div>
                                ) : (
                                    <button className="btnPadrao !text-base sm:!text-lg !font-bold" type="button" onClick={finalizarPedido} disabled={isSubmitting}>
                                        Finalizar Pedido
                                    </button>
                                )}

                                <Link to="/pagamento">
                                    <button className="btnPadrao !bg-gray-300 !text-zinc-900 !w-full !text-base sm:!text-lg !font-semibold !gap-2 mt-1">
                                        <FaArrowLeft />
                                        <span>Voltar para o pagamento</span>
                                    </button>
                                </Link>
                            </section>
                        </div>
                    </>
                )}
            </main>
        </>
    );
}
