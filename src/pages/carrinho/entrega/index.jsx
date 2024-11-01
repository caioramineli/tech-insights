import ResumoCart from "../resumo-cart";
import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useCarrinho } from '../../../contexts/contex-Cart';
import 'react-toastify/dist/ReactToastify.css';
import StepBar from "../step-bar";
import { FaPlus } from "react-icons/fa6";
import CarrinhoVazio from "../carrinhoVazio";
import { FormCadastrarEndereco } from "../../../components/FormsEndereco/cadastrar";
import { ToastContainer } from "react-toastify";
import Enderecos from "./enderecos";
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FormAtualizarEndereco } from "../../../components/FormsEndereco/atualizar";
import OpcaoFrete from "../../../components/OpcaoFrete";
import NavegacaoCarrinho from "../../../components/NavegacaoCarrinho";

export default function Entrega() {
    const { carrinho, frete, escolhaFrete, endereco } = useCarrinho();
    const { user } = useContext(AuthContext);
    const [formEndereco, setFormEndereco] = useState(false);
    const [formEditarEndereco, setFormEditarEndereco] = useState(false);
    const [selectedEndereco, setSelectedEndereco] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [enderecos, setEnderecos] = useState([]);
    const api = process.env.REACT_APP_API_URL;

    const notifyError = (message) => toast.error(message);
    const navigate = useNavigate();

    const verificarEndereco = () => {
        if (endereco._id === undefined) {
            notifyError('Escolha um endereço de entrega');
        } else {
            navigate('/pagamento');
        }
    }

    const freteEscolhido = (tipo) => {
        escolhaFrete(tipo);
    };

    function openFormEnderecoModal() {
        setFormEndereco(true);
        setFormEditarEndereco(false);
    }

    const fetchEnderecos = useCallback(async () => {
        if (!user || !user.id) {
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.get(`${api}user/${user.id}/endereco`);
            setEnderecos(response.data.enderecos);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [user, api]);

    useEffect(() => {
        if (user && user.id) {
            fetchEnderecos();
        }
    }, [fetchEnderecos, user]);

    return (
        <>
            <main className="flex flex-col w-full gap-4">
                {carrinho.length === 0 ? (
                    <CarrinhoVazio />
                ) : (
                    <>
                        <StepBar step={3} />
                        <div className="flex flex-col lg:flex-row lg:gap-4 xl:gap-8 w-[90%] xl:w-4/5 m-auto min-h-[42vh] max-w-[1300px] justify-between">
                            <section className="flex flex-col gap-5 w-full mb-4">
                                <div className="flex flex-col bg-white bsPadrao rounded-lg p-4 gap-3">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-base sm:text-lg font-bold text-emerald-600">Endereço de Entrega</h2>
                                        <button className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 duration-200 text-teal-50 p-2 rounded-md font-bold text-xs sm:text-base" onClick={openFormEnderecoModal}>
                                            <FaPlus />
                                            Novo endereço
                                        </button>
                                    </div>
                                    <hr />
                                    {formEndereco && (
                                        <>
                                            <h2 className="text-lg">Novo endereço de entrega</h2>
                                            <FormCadastrarEndereco
                                                setEstadoForm={setFormEndereco}
                                                userId={user.id}
                                                atualizarEnderecos={fetchEnderecos}
                                            />
                                        </>
                                    )}
                                    {formEditarEndereco && (
                                        <>
                                            <h2 className="text-lg">Atualizar endereço de entrega</h2>
                                            <FormAtualizarEndereco
                                                setEstadoForm={setFormEditarEndereco}
                                                userId={user.id}
                                                atualizarEnderecos={fetchEnderecos}
                                                endereco={selectedEndereco}
                                                setEndereco={setSelectedEndereco}
                                            />
                                        </>
                                    )}
                                    <Enderecos
                                        userId={user.id}
                                        enderecos={enderecos}
                                        atualizarEnderecos={fetchEnderecos}
                                        isLoading={isLoading}
                                        setFormEnderecoCadastrar={setFormEndereco}
                                        formAtualizar={formEditarEndereco}
                                        setFormAtualizar={setFormEditarEndereco}
                                        selectedEndereco={selectedEndereco}
                                        setSelectedEndereco={setSelectedEndereco}
                                    />
                                </div>

                                <div className="flex flex-col bg-white bsPadrao rounded-lg p-4 gap-3">
                                    <h2 className="text-base sm:text-lg font-bold">Opções de Envio</h2>

                                    <hr />

                                    <OpcaoFrete
                                        tipo="normal"
                                        descricao="Normal"
                                        preco="15,00"
                                        prazo="até 8 dias úteis"
                                        freteAtual={frete.tipo}
                                        onSelecionar={freteEscolhido}
                                    />


                                    <OpcaoFrete
                                        tipo="agendado"
                                        descricao="Agendado"
                                        preco="20,00"
                                        prazo="a partir de 8 dias úteis"
                                        freteAtual={frete.tipo}
                                        onSelecionar={freteEscolhido}
                                    />

                                    <OpcaoFrete
                                        tipo="expresso"
                                        descricao="Expresso"
                                        preco="30,00"
                                        prazo="até 5 dias úteis"
                                        freteAtual={frete.tipo}
                                        onSelecionar={freteEscolhido}
                                    />
                                </div>

                                <NavegacaoCarrinho
                                    onClick={verificarEndereco}
                                    linkVoltar="/carrinho"
                                    textoVoltar="Voltar para o carrinho"
                                    textoContinuar="Continuar para pagamento"
                                    responsivo="hidden lg:flex"
                                />
                            </section>

                            <section className="flex flex-col gap-4 max-lg:mt-1">
                                <ResumoCart />
                                <NavegacaoCarrinho
                                    onClick={verificarEndereco}
                                    linkVoltar="/carrinho"
                                    textoVoltar="Voltar"
                                    textoContinuar="Continuar para pagamento"
                                    responsivo="flex lg:hidden"
                                />
                            </section>

                        </div>
                        <ToastContainer />
                    </>
                )}
            </main>
        </>
    );
}