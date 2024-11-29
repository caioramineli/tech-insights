import "../style.css";
import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from '../../../../contexts/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../../../../components/Loading";
import BtnCancelar from "../../../../components/BtnCancel";
import BtnRed from "../../../../components/BtnRed";

const DesativarProduto = ({ produto, atualizarProdutos, setEstadoModal }) => {
    const { token } = useContext(AuthContext);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const api = process.env.REACT_APP_API_URL;

    const notifySuccess = () => toast.success("Cadastro realizado com sucesso!");
    const notifyError = (message) => toast.error(message);

    function closeModal() {
        setEstadoModal(false);
        document.body.style.overflow = 'auto';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await axios.patch(api + "desativar-produto", {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            notifySuccess();
            atualizarProdutos()
        } catch (error) {
            const erro = error.response?.data?.msg || "Erro ao desativar o produto.";
            notifyError(erro);
        }
    };

    return (
        <form className="p-1 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex items-center gap-4">
                <img className="w-20" src={api + produto.images[0]} alt="img-produto" />
                <h3 className="text-sm sm:text-base font-semibold text-zinc-900">{produto.nome}</h3>
            </div>
            {isSubmitting ? (
                <div className='flex justify-center h-[2.5rem] items-center'>
                    <Loading />
                </div>
            ) : (
                <div className='flex justify-center gap-4'>
                    <BtnCancelar onClick={closeModal} />
                    <BtnRed text='Desativar' />
                </div>
            )}
        </form>
    );
};

export default DesativarProduto;