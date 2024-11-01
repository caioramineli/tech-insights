import ResumoCart from "../resumo-cart";
import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useCarrinho } from '../../../contexts/contex-Cart';
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import StepBar from "../step-bar";
import { FaPlus } from "react-icons/fa6";
import CarrinhoVazio from "../carrinhoVazio";
import { FaArrowLeft } from "react-icons/fa6";
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from "react-icons/io";
import { FormCadastrarEndereco } from "../../../components/FormsEndereco/cadastrar";
import { ToastContainer } from "react-toastify";
import Enderecos from "./enderecos";
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FormAtualizarEndereco } from "../../../components/FormsEndereco/atualizar";

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
                                        <button className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 duration-200 text-teal-50 p-2 rounded-md font-bold text-xs sm:text-base" onClick={openFormEnderecoModal}><FaPlus /> Novo endereço</button>
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
                                    <h2 className="text-lg font-bold">Opções de Envio</h2>

                                    <hr />

                                    <div
                                        onClick={() => freteEscolhido('normal')}
                                        className={`border-emerald-600 text-sm md:text-base hover:border-emerald-600 duration-200 flex justify-between items-center border px-4 py-2 rounded-md cursor-pointer ${frete.tipo !== 'normal' ? 'border-zinc-300' : ''}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <IoMdRadioButtonOn className={frete.tipo === 'normal' ? 'text-3xl text-emerald-600' : 'hidden'} />
                                            <IoMdRadioButtonOff className={frete.tipo !== 'normal' ? 'text-3xl' : 'hidden'} />
                                            <span>Normal - R$ 15,00</span>
                                        </div>
                                        <span>Entrega em: até 8 dias úteis</span>
                                    </div>

                                    <div onClick={() => freteEscolhido('agendado')}
                                        className={`border-emerald-600 hover:border-emerald-600 text-sm md:text-base duration-200 flex justify-between items-center border px-4 py-2 rounded-md cursor-pointer ${frete.tipo !== 'agendado' ? 'border-zinc-300' : ''}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <IoMdRadioButtonOn className={frete.tipo === 'agendado' ? 'text-3xl text-emerald-600' : 'hidden'} />
                                            <IoMdRadioButtonOff className={frete.tipo !== 'agendado' ? 'text-3xl' : 'hidden'} />
                                            <span>Agendado - R$ 20,00</span>
                                        </div>
                                        <span>Entrega em: a partir 8 dias úteis</span>
                                    </div>

                                    <div
                                        onClick={() => freteEscolhido('expresso')}
                                        className={`border-emerald-600 text-sm md:text-base hover:border-emerald-600 duration-200 flex justify-between items-center border px-4 py-2 rounded-md cursor-pointer ${frete.tipo !== 'expresso' ? 'border-zinc-300' : ''}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <IoMdRadioButtonOn className={frete.tipo === 'expresso' ? 'text-3xl text-emerald-600' : 'hidden'} />
                                            <IoMdRadioButtonOff className={frete.tipo !== 'expresso' ? 'text-3xl' : 'hidden'} />
                                            <span>Expresso - R$ 30,00</span>
                                        </div>
                                        <span>Entrega em: até 5 dias úteis</span>
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <Link to="/carrinho">
                                        <button className="flex items-center gap-2 p-2 hover:bg-zinc-300 duration-200 rounded-md">
                                            <FaArrowLeft />
                                            <span className="uppercase text-sm">Voltar para o carrinho</span>
                                        </button>
                                    </Link>

                                    <button onClick={verificarEndereco} className="btnPadrao !p-2 !font-bold !text-sm sm:!text-base" type="button">
                                        Continuar para pagamento
                                    </button>
                                </div>
                            </section>

                            <section className="containerResumoFinalizar">
                                <ResumoCart />
                            </section>
                        </div>
                        <ToastContainer />
                    </>
                )}
            </main>
        </>
    );
}