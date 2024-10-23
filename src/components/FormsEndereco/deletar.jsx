import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../Loading";
import { useState } from "react";

const FormDeletarEndereco = ({ setEstadoForm, endereco, atualizarEnderecos, userId }) => {
    const api = process.env.REACT_APP_API_URL;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const notifySuccess = () => toast.success("Endereço excluido com sucesso!");
    const notifyError = (message) => toast.error(message);

    function closeModal() {
        setEstadoForm(false);
        document.body.style.overflow = 'auto';
    }

    const deletarEndereco = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await axios.delete(`${api}user/${userId}/endereco/${endereco._id}`);
            notifySuccess();
            atualizarEnderecos();
            closeModal();
        } catch (error) {
            console.error('Erro ao remover endereço:', error.response || error);
            notifyError("Erro ao remover endereço");
        }
    }

    return (
        <form onSubmit={deletarEndereco} className="flex flex-col gap-4">
            <div>
                <h3 className="font-bold text-base">{endereco.nome}</h3>
                <p className="text-base">{endereco.rua} {endereco.numero}</p>
                <p className="text-sm">{endereco.bairro} - {endereco.cidade} - {endereco.estado}, {endereco.cep}</p>
            </div>

            <div>
                {isSubmitting ? (
                    <div className='flex justify-center h-[2.5rem] items-center'>
                        <Loading />
                    </div>
                ) : (
                    <div className='flex justify-center gap-4'>
                        <button className='bg-gray-300 rounded-md py-2 px-6' type='button' onClick={closeModal}>Cancelar</button>
                        <button className='bg-red-700 rounded-md py-2 px-6 font-bold text-emerald-50' type='submit'>Excluir</button>
                    </div>
                )}
            </div>
        </form>
    );
}

export { FormDeletarEndereco };