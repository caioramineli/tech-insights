import React, { useState, useEffect, useCallback } from 'react';
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from 'react-icons/io';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../components/Loading';
import { useCarrinho } from "../../../contexts/contex-Cart";
import { Modal } from '../../../components/Modal';
import { FormDeletarEndereco } from '../../../components/FormsEndereco/deletar';

const Enderecos = ({ enderecos = [], userId, atualizarEnderecos, isLoading, setFormEnderecoCadastrar, setFormAtualizar, selectedEndereco, setSelectedEndereco }) => {
    const [toggle, setToggle] = useState(0);
    const [modalExcluirEndereco, setModalExcluirEndereco] = useState(false);
    const { setEndereco } = useCarrinho();

    const escolhaEnderecoInicial = useCallback((endereco) => {
        setEndereco(endereco);
    }, [setEndereco]);

    useEffect(() => {
        if (enderecos.length > 0) {
            setToggle(0);
            escolhaEnderecoInicial(enderecos[0]);
        }
    }, [enderecos, escolhaEnderecoInicial]);

    function openModalExcluirEndereco(endereco) {
        setSelectedEndereco(endereco);
        setModalExcluirEndereco(true);
        document.body.style.overflow = 'hidden';
    }

    function updateToggle(index) {
        setToggle(index);
    }

    function escolhaEndereco(endereco) {
        setEndereco(endereco);
    }

    function openFormAtualizarEndereco(endereco) {
        setFormEnderecoCadastrar(false)
        setFormAtualizar(true);
        setSelectedEndereco(endereco)
    }

    if (isLoading) {
        return (
            <div className='m-auto'>
                <Loading color='#047857' />;
            </div>
        )
    }

    if (enderecos.length === 0) {
        return <p>Nenhum endereço cadastrado!</p>;
    }

    return (
        <>
            {enderecos.map((endereco, index) => (
                <div key={index} onClick={() => { updateToggle(index); escolhaEndereco(endereco); }} className={`border-emerald-600 hover:border-emerald-600 duration-200 flex justify-between items-center border px-4 py-2 rounded-md cursor-pointer ${toggle === index ? 'border-emerald-600' : 'border-zinc-300'}`}>
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
                        <button onClick={() => openFormAtualizarEndereco(endereco)} className="flex items-center border border-zinc-300 px-3 py-2 rounded-md gap-2 text-sm hover:border-cyan-600">
                            <FaPencilAlt />
                            Editar
                        </button>
                        <button className="flex items-center border border-zinc-300 px-3 py-2 rounded-md gap-2 text-sm hover:border-red-700" onClick={() => openModalExcluirEndereco(endereco)}>
                            <FaTrash />
                            Excluir
                        </button>
                        {modalExcluirEndereco && (
                            <Modal setEstado={setModalExcluirEndereco} titulo="Deseja excluir esse endereço?" largura='md'>
                                <FormDeletarEndereco
                                    setEstadoForm={setModalExcluirEndereco}
                                    userId={userId}
                                    atualizarEnderecos={atualizarEnderecos}
                                    endereco={selectedEndereco}
                                />
                            </Modal>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
};

export default Enderecos;
