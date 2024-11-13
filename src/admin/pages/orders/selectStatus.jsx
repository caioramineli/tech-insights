import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SelectStatus({ pedido, token }) {
    const [status, setStatus] = useState(pedido.status);
    const [isEdited, setIsEdited] = useState(false);
    const api = process.env.REACT_APP_API_URL;

    const statusOptions = ['Pedido realizado', 'Enviado', 'Concluído', 'Cancelado'];

    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pedido realizado':
                return 'text-cyan-600';
            case 'Enviado':
                return 'text-yellow-600';
            case 'Concluído':
                return 'text-emerald-600';
            case 'Cancelado':
                return 'text-red-600';
            default:
                return 'text-zinc-900';
        }
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
        setIsEdited(true);
    };

    const handleSave = async () => {
        try {
            const data = {
                idPedido: pedido._id,
                novoStatus: status
            };
            setIsEdited(false);
            const response = await axios.patch(`${api}trocar-status-pedido`, data, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            notifySuccess(response.data.message || 'Status atualizado com sucesso!');
        } catch (error) {
            const errorMessage = error.response?.data?.msg || 'Erro ao alterar status!';
            notifyError(errorMessage);
        }
    };

    return (
        <div className='flex flex-col items-start gap-2 !text-base'>
            <div className='flex flex-col items-center'>
                <p className={`${getStatusColor(status)} font-bold`}>
                    Status do pedido
                </p>
                <select
                    className='text-zinc-900 border border-gray-300 rounded-md p-1'
                    value={status}
                    onChange={handleStatusChange}
                >
                    {statusOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
            {isEdited && (
                <button
                    onClick={handleSave}
                    className='bg-emerald-600 m-auto text-white py-1 px-4 w-full rounded-md hover:bg-emerald-700'
                >
                    Salvar
                </button>
            )}
        </div>
    );
}

export default SelectStatus;
