import { FaMapLocationDot } from "react-icons/fa6";
import VoltarMinhaConta from "../../../components/VoltarMinhaConta";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import axios from "axios";
import { BsPencilSquare } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import Loading from "../../../components/Loading";
import { Modal } from "../../../components/Modal";
import { FormCadastrarEndereco } from "../../../components/FormsEndereco/cadastrar";
import { FormAtualizarEndereco } from "../../../components/FormsEndereco/atualizar";
import { FormDeletarEndereco } from "../../../components/FormsEndereco/deletar";
import { ToastContainer } from "react-toastify";


const EnderecosUser = () => {
    const { user, token } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [enderecos, setEnderecos] = useState([]);
    const [modalCreate, setModalCreate] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [selectedEndereco, setSelectedEndereco] = useState(null);
    const api = process.env.REACT_APP_API_URL;

    function openModalCreate() {
        setModalCreate(true);
        document.body.style.overflow = 'hidden';
    }

    function openModalUpdate(endereco) {
        setSelectedEndereco(endereco);
        setModalUpdate(true);
        document.body.style.overflow = 'hidden';
    }

    function openModalDelete(endereco) {
        setSelectedEndereco(endereco);
        setModalDelete(true);
        document.body.style.overflow = 'hidden';
    }

    const fetchEnderecos = useCallback(async () => {
        if (!user || !user.id) {
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.get(`${api}user/${user.id}/endereco`, { headers: { 'Authorization': `Bearer ${token}` } });
            setEnderecos(response.data.enderecos);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [user, api, token]);

    useEffect(() => {
        if (user && user.id) {
            fetchEnderecos();
        }
    }, [fetchEnderecos, user]);

    return (
        <div className='containerPadrao !my-6 sm:!my-8 gap-6'>

            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <FaMapLocationDot className='text-emerald-600 text-3xl sm:text-4xl' />
                    <h1 className="font-bold text-zinc-900 text-lg md:text-2xl">Meus Endereços</h1>
                </div>
                <VoltarMinhaConta />
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center">
                    <Loading />
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {enderecos.map((endereco) => (
                            <div key={endereco._id} className="flex flex-col rounded-md shadow-md bg-white">
                                <div className="flex justify-between items-center bg-cyan-800 py-2 px-3 rounded-t-md">
                                    <h2 className="text-base sm:text-lg font-semibold uppercase text-white">{endereco.nome}</h2>
                                    <div className="flex gap-3 items-center">
                                        <button onClick={() => openModalUpdate(endereco)}>
                                            <BsPencilSquare className="text-xl text-emerald-400" />
                                        </button>
                                        <button onClick={() => openModalDelete(endereco)}>
                                            <FaTrash className="text-xl text-emerald-400" />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col py-2 px-3">
                                    <p className="font-semibold">{endereco.rua}, {endereco.numero}</p>
                                    <p>{endereco.complemento}</p>
                                    <p>{endereco.bairro} - {endereco.cidade} - {endereco.estado}</p>
                                    <p>CEP {endereco.cep}</p>
                                </div>
                            </div>
                        ))}
                        <div>
                            <button onClick={openModalCreate} className="btnPadrao">Novo endereço</button>
                        </div>
                    </div>

                    {modalCreate && (
                        <Modal setEstado={setModalCreate} titulo="Cadastrar endereço" largura="max-w-4xl">
                            <FormCadastrarEndereco
                                setEstadoForm={setModalCreate}
                                userId={user.id}
                                atualizarEnderecos={fetchEnderecos}
                            />
                        </Modal>
                    )}

                    {modalUpdate && (
                        <Modal setEstado={setModalUpdate} titulo="Atualizar endereço" largura="max-w-4xl">
                            <FormAtualizarEndereco
                                setEstadoForm={setModalUpdate}
                                userId={user.id}
                                atualizarEnderecos={fetchEnderecos}
                                endereco={selectedEndereco}
                                setEndereco={setSelectedEndereco}
                            />
                        </Modal>
                    )}

                    {modalDelete && (
                        <Modal setEstado={setModalDelete} titulo="Deseja excluir esse endereço?" largura="max-w-md">
                            <FormDeletarEndereco
                                setEstadoForm={setModalDelete}
                                userId={user.id}
                                atualizarEnderecos={fetchEnderecos}
                                endereco={selectedEndereco}
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

export default EnderecosUser;
