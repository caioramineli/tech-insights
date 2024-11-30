import { useContext, useState } from "react";
import Loading from "../../../../components/Loading";
import { AuthContext } from "../../../../contexts/AuthContext";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import BtnCancelar from "../../../../components/BtnCancel";
import BtnRed from "../../../../components/BtnRed";
import CloseModal from "../../../../components/CloseModal.jsx";
import { format } from "date-fns";

const FormDeletarCupom = ({ setEstadoModal, atualizarCupons, cupom }) => {
    const { token } = useContext(AuthContext);
    const api = process.env.REACT_APP_API_URL;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);
    const closeModal = CloseModal({ setEstadoModal });

    function formatarPreco(preco) {
        if (preco == null || isNaN(preco)) {
            return 'R$ 0,00';
        }
        return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await axios.delete(
                `${api}excluir-cupom`,
                {
                    data: { cupomId: cupom._id },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            notifySuccess(response.data.msg);
            closeModal();
            atualizarCupons();
        } catch (error) {
            const erro = error.response?.data?.msg || "Erro ao excluir cupom.";
            notifyError(erro);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form method="POST" onSubmit={handleSubmit} className='flex flex-col gap-4'>

            <div>
                <p className="text-lg"><span className="font-semibold">Código: </span>{cupom.codigo}</p>
                <p><span className="font-semibold">Descrição: </span>{cupom.descricao}</p>
                <p><span className="font-semibold">Tipo: </span>{cupom.tipo}</p>
                <p><span className="font-semibold">Valor: </span>{formatarPreco(cupom.valor)}</p>
                <p><span className="font-semibold">Valor min. do carrinho: </span>{formatarPreco(cupom.valorMinimoDoCarrinho)}</p>
                <p><span className="font-semibold">Quantidade: </span>{cupom.quantidade}</p>
                <p><span className="font-semibold">Validade: </span>{format(new Date(cupom.validade), "dd/MM/yyyy")}</p>
            </div>

            <div>
                {isSubmitting ? (
                    <div className='flex justify-center h-[3.42rem] items-center'>
                        <Loading color="#047857" />
                    </div>
                ) : (
                    <div className='flex justify-end gap-4'>
                        <BtnCancelar onClick={closeModal} />
                        <BtnRed text={'Excluir'} />
                    </div>
                )}
            </div>
        </form>
    );
}

export default FormDeletarCupom;