import VoltarMinhaConta from "../../../components/VoltarMinhaConta";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import axios from "axios";
import { BsPencilSquare } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import Loading from "../../../components/Loading";
import { Modal } from "../../../components/Modal";
import FormCadastrarCupom from "./forms/cadastarCupom";
import FormAtualizarCupom from "./forms/atualizarCupom";
import FormDeletarCupom from "./forms/deletarCupom";
import { ToastContainer } from "react-toastify";
import { MdDiscount } from "react-icons/md";
import { format } from 'date-fns';

const AdminCupomPage = () => {
    const { token } = useContext(AuthContext);
    const api = process.env.REACT_APP_API_URL;
    const [isLoading, setIsLoading] = useState(true);
    const [cupons, setCupons] = useState([]);
    const [modalCreate, setModalCreate] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [selectedCupom, setSelectedCupom] = useState(null);

    function formatarPreco(preco) {
        if (preco == null || isNaN(preco)) {
            return 'R$ 0,00';
        }
        return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function openModalCreate() {
        setModalCreate(true);
        document.body.style.overflow = 'hidden';
    }

    function openModalUpdate(cupom) {
        setSelectedCupom(cupom);
        setModalUpdate(true);
        document.body.style.overflow = 'hidden';
    }

    function openModalDelete(cupom) {
        setSelectedCupom(cupom);
        setModalDelete(true);
        document.body.style.overflow = 'hidden';
    }

    const listarCupons = useCallback(async () => {
        setIsLoading(true);

        try {
            const response = await axios.get(`${api}listar-cupons`);
            setCupons(response.data.cupons);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }, [api]);

    useEffect(() => {
        if (token) {
            listarCupons();
        }
    }, [token, listarCupons]);

    return (
        <div className='containerPadrao !my-6 sm:!my-8 gap-6'>

            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div className="flex items-center gap-2">
                    <MdDiscount className='text-emerald-600 text-3xl sm:text-4xl' />
                    <h1 className="font-bold text-zinc-900 text-lg md:text-2xl">Gerenciar Cupons</h1>
                </div>
                <div className="flex items-center justify-between gap-3">
                    <button onClick={openModalCreate} className="btnPadrao">Novo Cupom</button>

                    <VoltarMinhaConta caminho='/admin' />
                </div>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center">
                    <Loading />
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                        {cupons.map((cupom) => (
                            <div key={cupom.codigo} className="flex flex-col rounded-md bg-white shadow-md">
                                <div className="flex justify-between items-center bg-cyan-800 py-2 px-3 rounded-t-md">
                                    <h2 className="text-base sm:text-lg font-semibold uppercase text-white">{cupom.codigo}</h2>
                                    <div className="flex gap-3 items-center">
                                        <button onClick={() => openModalUpdate(cupom)}>
                                            <BsPencilSquare className="text-xl text-emerald-400" />
                                        </button>
                                        <button onClick={() => openModalDelete(cupom)}>
                                            <FaTrash className="text-xl text-emerald-400" />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col py-2 px-3">
                                    <p><span className="font-semibold">Descrição: </span>{cupom.descricao}</p>
                                    <p><span className="font-semibold">Tipo: </span>{cupom.tipo}</p>
                                    <p><span className="font-semibold">Valor: </span>{formatarPreco(cupom.valor)}</p>
                                    <p><span className="font-semibold">Valor min. do carrinho: </span>{formatarPreco(cupom.valorMinimoDoCarrinho)}</p>
                                    <p><span className="font-semibold">Quantidade: </span>{cupom.quantidade}</p>
                                    <p><span className="font-semibold">Validade: </span>{format(new Date(cupom.validade), "dd/MM/yyyy")}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {modalCreate && (
                        <Modal setEstado={setModalCreate} titulo="Cadastrar Cupom" largura="max-w-3xl">
                            <FormCadastrarCupom
                                setEstadoModal={setModalCreate}
                                atualizarCupons={listarCupons}
                            />
                        </Modal>
                    )}

                    {modalUpdate && (
                        <Modal setEstado={setModalUpdate} titulo="Atualizar cupom" largura="max-w-3xl">
                            <FormAtualizarCupom
                                setEstadoModal={setModalUpdate}
                                atualizarCupons={listarCupons}
                                formData={selectedCupom}
                                setFormData={setSelectedCupom}
                            />
                        </Modal>
                    )}

                    {modalDelete && (
                        <Modal setEstado={setModalDelete} titulo="Deseja excluir esse cupom?" largura="max-w-md">
                            <FormDeletarCupom
                                setEstadoModal={setModalDelete}
                                atualizarCupons={listarCupons}
                                cupom={selectedCupom}
                            />
                        </Modal>
                    )}
                </>
            )}
            <ToastContainer
                autoClose={3000}
            />
        </div>
    );
}

export default AdminCupomPage;