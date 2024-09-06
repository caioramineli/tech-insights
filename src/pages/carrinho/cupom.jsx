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
    const { aplicarDesconto } = useCarrinho();

    const notifySuccess = (text) => toast.success(text);
    const notifyError = (text) => toast.error(text);

    const handleCupomChange = (e) => {
        setCupomCode(e.target.value);
    };

    const verifyCupom = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://backend-tech-insights.vercel.app/cupon/${cupomCode}`);
            aplicarDesconto(response.data.desconto);
            notifySuccess("Cupom aplicado com sucesso!")
        } catch (err) {
            notifyError("Cupom Inválido!")
            aplicarDesconto(0);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col bg-white rounded-md bsPadrao p-4 gap-2">
            <h3 className="text-lg font-bold">Aplicar desconto</h3>
            <div className="flex gap-2">
                <input
                    className="border border-zinc-400 rounded-md px-2 w-full outline-none focus:border-cyan-700"
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
                        className="flex items-center gap-2 bg-cyan-600 rounded-md p-2 text-cyan-50"
                        onClick={verifyCupom}
                    >
                        Aplicar <BiSolidCoupon />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Cupom;
