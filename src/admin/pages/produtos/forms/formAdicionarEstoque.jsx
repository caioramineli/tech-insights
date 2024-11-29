import "../style.css";
import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from '../../../../contexts/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../../../../components/Loading";
import InputModerno from "../../../../components/InputModerno";

const AdicionarEstoque = ({ produto, atualizarProdutos, setEstadoModal }) => {
    const { token, user } = useContext(AuthContext);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const api = process.env.REACT_APP_API_URL;

    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    function closeModal() {
        setEstadoModal(false);
        document.body.style.overflow = 'auto';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = {
            produtoId: produto._id,
            quantidade: parseInt(e.target.quantidade.value, 10),
            usuario: user.id
        }

        console.log(formData);

        try {
            const response = await axios.post(api + "registra-movimentacao", formData, {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            notifySuccess(response.data.msg);
            closeModal()
            atualizarProdutos()
        } catch (error) {
            const erro = error.response?.data?.msg || "Erro ao desativar o produto.";
            notifyError(erro);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="p-1 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex items-center gap-4">
                <img className="w-20" src={api + produto.images[0]} alt="img-produto" />
                <h3 className="text-sm sm:text-base font-semibold text-zinc-900">{produto.nome}</h3>
            </div>

            <hr />

            <p className="text-lg"><strong>Estoque atual: </strong>{produto.estoque}</p>

            <InputModerno
                name="quantidade"
                type="number"
                placeholder="10"
                label="Quantidade para adicionar"
                min='1'
            />

            {isSubmitting ? (
                <div className='flex justify-center h-[2.5rem] items-center'>
                    <Loading />
                </div>
            ) : (
                <div className='flex justify-center gap-4'>
                    <button className='btnPadrao !w-full' type='submit'>Adicionar no estoque</button>
                </div>
            )}
        </form>
    );
}

export default AdicionarEstoque;