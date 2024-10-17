import { FaMapLocationDot } from "react-icons/fa6";
import VoltarMinhaConta from "../../../components/VoltarMinhaConta";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import axios from "axios";
import { BsPencilSquare } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import Loading from "../../../components/Loading";
import ModalEndereco from "../../../components/ModalEndereco";

const EnderecosUser = () => {
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [enderecos, setEnderecos] = useState([]);
    const [modalCreate, setModalCreate] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [selectedEndereco, setSelectedEndereco] = useState(null);
    const api = process.env.REACT_APP_API_URL;

    function openModalCreate() {
        setModalCreate(true);
    }

    function openModalUpdate(endereco) {
        setSelectedEndereco(endereco);
        setModalUpdate(true);
    }

    function openModalDelete(endereco) {
        setSelectedEndereco(endereco);
        setModalDelete(true);
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

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className='flex flex-col w-[90%] xl:w-[80%] max-w-[1300px] min-h-[50vh] my-6 sm:my-8 gap-6'>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <FaMapLocationDot className='text-emerald-600 text-3xl sm:text-4xl' />
                    <h1 className="font-bold text-zinc-900 text-lg md:text-2xl">Meus Endereços</h1>
                </div>
                <VoltarMinhaConta />
            </div>

            <div className="grid grid-cols-3 gap-4">
                {enderecos.map((endereco) => (
                    <div key={endereco._id} className="flex flex-col rounded-md bsPadrao bg-white">
                        <div className="flex justify-between items-center bg-cyan-800 py-2 px-3 rounded-t-md">
                            <h2 className="text-lg font-semibold uppercase text-white">{endereco.nome}</h2>
                            <div className="flex gap-3 items-center">
                                <button onClick={() => openModalUpdate(endereco)}>
                                    <BsPencilSquare className="text-xl text-emerald-500" />
                                </button>
                                <button onClick={() => openModalDelete(endereco)}>
                                    <FaTrash className="text-xl text-emerald-500" />
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
            </div>

            {modalUpdate && (
                <ModalEndereco
                    setEstado={setModalUpdate}
                    titulo={`Atualizar endereço: ${selectedEndereco?.nome}`}
                />
            )}

            {modalDelete && (
                <ModalEndereco
                    setEstado={setModalDelete}
                    titulo={`Excluir endereço: ${selectedEndereco?.nome}`}
                />
            )}
        </div>
    );
}

export default EnderecosUser;
