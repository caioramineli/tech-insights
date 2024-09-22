import React, { useState } from 'react';
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from 'react-icons/io';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../components/Loading';

const Enderecos = ({ setEstado, enderecos = [], setFormData, userId, atualizarEnderecos, isLoading }) => {
    const [toggle, setToggle] = useState(0);
    const [modalExcluirEndereco, setModalExcluirEndereco] = useState(false);
    const [enderecoExcluir, setEnderecoExcluir] = useState(null);

    const notifySuccess = () => toast.success("Endereço removido com sucesso!");
    const notifyError = (message) => toast.error(message);

    function openModalExcluirEndereco(endereco) {
        setEnderecoExcluir(endereco);
        setModalExcluirEndereco(true);
    }

    function closeModalExcluirEndereco() {
        setModalExcluirEndereco(false);
        setEnderecoExcluir(null);
    }

    function updateToggle(index) {
        setToggle(index);
    }

    function atualizarEndereco(endereco) {
        setEstado(true);
        setFormData({
            enderecoId: endereco._id,
            nome: endereco.nome,
            cep: endereco.cep,
            rua: endereco.rua,
            numero: endereco.numero,
            complemento: endereco.complemento,
            bairro: endereco.bairro,
            cidade: endereco.cidade,
            estado: endereco.estado
        });
    }

    async function deletarEndereco(userId, enderecoId) {
        try {
            await axios.delete(`https://backend-tech-insights.vercel.app/user/${userId}/endereco/${enderecoId}`);
            closeModalExcluirEndereco();
            notifySuccess();
            atualizarEnderecos();
        } catch (error) {
            console.error('Erro ao remover endereço:', error.response || error);
            notifyError("Erro ao remover endereço");
        }
    }

    if (isLoading) {
        return <Loading color='#047857'/>;
    }

    if (enderecos.length === 0) {
        return <p>Nenhum endereço cadastrado!</p>;
    }

    return (
        <>
            {enderecos.map((endereco, index) => (
                <div key={index} onClick={() => updateToggle(index)} className={`border-emerald-600 flex justify-between items-center border px-4 py-2 rounded-md cursor-pointer ${toggle === index ? 'border-emerald-600' : 'border-zinc-300'}`}>
                    <div className="flex items-center gap-4">
                        <IoMdRadioButtonOn className={toggle === index ? 'text-3xl text-emerald-600' : 'hidden'} />
                        <IoMdRadioButtonOff className={toggle !== index ? 'text-3xl' : 'hidden'} />

                        <div className="flex flex-col">
                            <h3 className="font-bold text-base">{endereco.nome}</h3>
                            <p className="text-base">{endereco.rua} {endereco.numero}</p>
                            <p className="text-sm">{endereco.bairro} - {endereco.cidade} - {endereco.estado}, {endereco.cep}</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => atualizarEndereco(endereco)} className="flex items-center border border-zinc-300 px-3 py-2 rounded-md gap-2 text-sm hover:border-cyan-600">
                            <FaPencilAlt />
                            Editar
                        </button>
                        <button className="flex items-center border border-zinc-300 px-3 py-2 rounded-md gap-2 text-sm hover:border-red-700" onClick={() => openModalExcluirEndereco(endereco)}>
                            <FaTrash />
                            Excluir
                        </button>
                        {modalExcluirEndereco && enderecoExcluir && (
                            <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-10'>
                                <div className="flex flex-col gap-4 bg-white rounded-lg shadow-lg w-4/5 max-w-md p-5 relative">
                                    <IoClose onClick={closeModalExcluirEndereco} className="absolute top-2 right-2 text-slate-600 w-8 h-8 cursor-pointer" />
                                    <h1 className='text-lg font-bold'>Deseja realmente excluir esse endereço?</h1>
                                    <div className="flex flex-col">
                                        <h3 className="font-bold text-base">{enderecoExcluir.nome}</h3>
                                        <p className="text-base">{enderecoExcluir.rua} {enderecoExcluir.numero}</p>
                                        <p className="text-sm">{enderecoExcluir.bairro} - {enderecoExcluir.cidade} - {enderecoExcluir.estado}, {enderecoExcluir.cep}</p>
                                    </div>
                                    <div className='flex justify-center gap-4'>
                                        <button className='bg-gray-300 rounded-md py-2 px-6' type='button' onClick={closeModalExcluirEndereco}>Cancelar</button>
                                        <button className='bg-red-700 rounded-md py-2 px-6 font-bold text-emerald-50' type='submit' onClick={() => deletarEndereco(userId, enderecoExcluir._id)}>Excluir</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
};

export default Enderecos;
