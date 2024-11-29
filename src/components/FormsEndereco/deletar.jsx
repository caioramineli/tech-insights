import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../Loading";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import BtnCancelar from "../BtnCancel";
import BtnRed from "../BtnRed";

const FormDeletarEndereco = ({ setEstadoForm, endereco, atualizarEnderecos, userId }) => {
    const api = process.env.REACT_APP_API_URL;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { token } = useContext(AuthContext);

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
            await axios.delete(`${api}user/${userId}/endereco/${endereco._id}`, { headers: { 'Authorization': `Bearer ${token}` } });
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
                        <BtnCancelar onClick={closeModal} />
                        <BtnRed text='Excluir' />
                    </div>
                )}
            </div>
        </form>
    );
}

export { FormDeletarEndereco };