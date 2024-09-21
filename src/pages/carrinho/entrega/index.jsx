import ResumoCart from "../resumo-cart";
import React, { useState } from 'react';
import { useCarrinho } from '../../../contexts/contex-Cart';
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import Loading from "../../../components/Loading";
import StepBar from "../step-bar";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import CarrinhoVazio from "../carrinhoVazio";
import { FaArrowLeft } from "react-icons/fa6";
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from "react-icons/io";
import FormCadastrarEndereco from "./formCadastrarEndereco";
import { ToastContainer } from "react-toastify";

export default function Entrega() {
    const [formEndereco, setFormEndereco] = useState(false)
    const { carrinho } = useCarrinho();
    const [toggle, setToggle] = useState(1);
    const [toggleEnvio, setToggleEnvio] = useState(1);

    function updateToglle(id) {
        setToggle(id);
    }

    function updateToglleEnvio(id) {
        setToggleEnvio(id);
    }

    function openFormEnderecoModal() {
        setFormEndereco(true)
    }

    return (
        <>
            <main className="flex flex-col w-full gap-4">
                {carrinho.length === 0 ? (
                    <CarrinhoVazio />
                ) : (
                    <>
                        <StepBar step={3} />
                        <div className="flex gap-8 w-[90%] xl:w-4/5 m-auto min-h-[42vh] max-w-[1300px] justify-between">
                            <section className="flex flex-col gap-5 w-full mb-4">
                                <div className="flex flex-col bg-white bsPadrao rounded-lg p-4 gap-3">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-lg font-bold text-emerald-600">Endereço de Entrega</h2>
                                        <button className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 duration-200 text-teal-50 p-2 rounded-md font-bold" onClick={openFormEnderecoModal}><FaPlus /> Novo endereço</button>
                                    </div>

                                    <hr />

                                    {formEndereco && (
                                        <FormCadastrarEndereco estado={formEndereco} setEstado={setFormEndereco} />
                                    )}

                                    <div onClick={() => updateToglle(1)} className={`border-emerald-600 flex justify-between items-center border px-4 py-2 rounded-md cursor-pointer ${toggle !== 1 ? 'border-zinc-300' : ''}`}>
                                        <div className="flex items-center gap-4">
                                            <IoMdRadioButtonOn className={toggle === 1 ? 'text-3xl text-emerald-600' : 'hidden'} />
                                            <IoMdRadioButtonOff className={toggle !== 1 ? 'text-3xl' : 'hidden'} />

                                            <div className="flex flex-col">
                                                <h3 className="font-bold text-base">Casa Caio</h3>
                                                <p className="text-base">Rua Vicente Lopes Ramon 764</p>
                                                <p className="text-sm">Centro - Anhumas - SP, 19580-000</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <button className="flex items-center border border-zinc-300 px-3 py-2 rounded-md gap-2 text-sm">
                                                <FaPencilAlt />
                                                Editar
                                            </button>
                                            <button className="flex items-center border border-zinc-300 px-3 py-2 rounded-md gap-2 text-sm">
                                                <FaTrash />
                                                Excluir
                                            </button>
                                        </div>
                                    </div>

                                    <div onClick={() => updateToglle(2)} className={`border-emerald-600 flex justify-between items-center border px-4 py-2 rounded-md cursor-pointer ${toggle !== 2 ? 'border-zinc-300' : ''}`}>
                                        <div className="flex items-center gap-4">
                                            <IoMdRadioButtonOn className={toggle === 2 ? 'text-3xl text-emerald-600' : 'hidden'} />
                                            <IoMdRadioButtonOff className={toggle !== 2 ? 'text-3xl' : 'hidden'} />

                                            <div className="flex flex-col">
                                                <h3 className="font-bold text-base">Casa Caio</h3>
                                                <p className="text-base">Rua Vicente Lopes Ramon 764</p>
                                                <p className="text-sm">Centro - Anhumas - SP, 19580-000</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <button className="flex items-center border border-zinc-300 px-3 py-2 rounded-md gap-2 text-sm">
                                                <FaPencilAlt />
                                                Editar
                                            </button>
                                            <button className="flex items-center border border-zinc-300 px-3 py-2 rounded-md gap-2 text-sm">
                                                <FaTrash />
                                                Excluir
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col bg-white bsPadrao rounded-lg p-4 gap-3">
                                    <h2 className="text-lg font-bold">Opções de Envio</h2>

                                    <hr />

                                    <div onClick={() => updateToglleEnvio(1)} className={`border-emerald-600 flex justify-between items-center border px-4 py-1 rounded-md cursor-pointer ${toggleEnvio !== 1 ? 'border-zinc-300' : ''}`}>
                                        <div className="flex items-center gap-4">
                                            <IoMdRadioButtonOn className={toggleEnvio === 1 ? 'text-3xl text-emerald-600' : 'hidden'} />
                                            <IoMdRadioButtonOff className={toggleEnvio !== 1 ? 'text-3xl' : 'hidden'} />
                                            <span>Expresso</span>
                                        </div>
                                        <span>Entrega em: até 5 dias úteis</span>
                                    </div>

                                    <div onClick={() => updateToglleEnvio(2)} className={`border-emerald-600 flex justify-between items-center border px-4 py-1 rounded-md cursor-pointer ${toggleEnvio !== 2 ? 'border-zinc-300' : ''}`}>
                                        <div className="flex items-center gap-4">
                                            <IoMdRadioButtonOn className={toggleEnvio === 2 ? 'text-3xl text-emerald-600' : 'hidden'} />
                                            <IoMdRadioButtonOff className={toggleEnvio !== 2 ? 'text-3xl' : 'hidden'} />
                                            <span>Expresso</span>
                                        </div>
                                        <span>Entrega em: até 5 dias úteis</span>
                                    </div>

                                    <div onClick={() => updateToglleEnvio(3)} className={`border-emerald-600 flex justify-between items-center border px-4 py-1 rounded-md cursor-pointer ${toggleEnvio !== 3 ? 'border-zinc-300' : ''}`}>
                                        <div className="flex items-center gap-4">
                                            <IoMdRadioButtonOn className={toggleEnvio === 3 ? 'text-3xl text-emerald-600' : 'hidden'} />
                                            <IoMdRadioButtonOff className={toggleEnvio !== 3 ? 'text-3xl' : 'hidden'} />
                                            <span>Expresso</span>
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
                                    <Link to="/pagamento">
                                        <button className="bg-emerald-600 hover:bg-emerald-700 duration-200 p-2 rounded-md text-emerald-50 font-bold" type="button">Continuar para pagamento</button>
                                    </Link>
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