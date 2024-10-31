import React, { useState } from 'react';
import axios from 'axios';
import { BiSolidCoupon } from 'react-icons/bi';
import { useCarrinho } from '../../contexts/contex-Cart';
import Loading from '../../components/Loading';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const Cupom = () => {
    const [cupomCode, setCupomCode] = useState('');
    const [loading, setLoading] = useState(false)
    const { calcularValorTotal, setCupom, setDesconto } = useCarrinho();
    const api = process.env.REACT_APP_API_URL;

    const notifySuccess = (text) => toast.success(text);
    const notifyError = (text) => toast.error(text);

    const handleCupomChange = (e) => {
        setCupomCode(e.target.value);
    };

    const verifyCupom = async () => {
        setLoading(true);
        setDesconto(0);
        setCupom([]);
        try {
            const response = await axios.get(`${api}cupon/${cupomCode}`);
            if (calcularValorTotal < response.data.minimo) {
                notifyError("O valor mínimo do carrinho é de R$ " + response.data.minimo);
                setCupom([]);
                return setDesconto(0);
            }
            setCupom(response.data);
            notifySuccess("Cupom aplicado com sucesso!");
        } catch (err) {
            setCupom([]);
            notifyError("Cupom Inválido!");
            return setDesconto(0);
        } finally {
            setCupomCode('')
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col bg-white rounded-md bsPadrao p-3 sm:p-4 gap-2">
            <h3 className="text-base sm:text-lg font-bold">Aplicar desconto</h3>
            <form onSubmit={verifyCupom} className="flex gap-2">
                <input
                    className="border text-sm sm:text-base border-zinc-400 rounded-md px-2 w-full outline-none focus:border-cyan-700"
                    type="text"
                    value={cupomCode}
                    onChange={handleCupomChange}
                    placeholder="Digite seu cupom"
                    disabled={loading}
                />
                {loading ? (
                    <div className='px-[1.83rem]'>
                        <Loading stroke='5' size='34' />
                    </div>
                ) : (
                    <button
                        type='submit'
                        className="flex items-center gap-2 bg-cyan-600 rounded-md p-2 text-cyan-50 text-sm sm:text-base"
                        onClick={verifyCupom}
                    >
                        Aplicar <BiSolidCoupon />
                    </button>
                )}
            </form>
        </div>
    );
};

export default Cupom;
