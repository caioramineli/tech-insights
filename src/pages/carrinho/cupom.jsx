import React, { useState } from 'react';
import axios from 'axios';
import { BiSolidCoupon } from 'react-icons/bi';

const Cupom = () => {
    const [cupomCode, setCupomCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [error, setError] = useState('');

    const handleCupomChange = (e) => {
        setCupomCode(e.target.value);
    };

    const verifycupom = async () => {
        try {
            const response = await axios.get(`https://backend-tech-insights.vercel.app/
cupon/${cupomCode}`);
            setDiscount(response.data.desconto);
            setError(''); // Limpe o erro se o cupom for válido
        } catch (err) {
            setError(err.response?.data?.msg || 'Erro ao verificar o cupom.');
            setDiscount(0); // Zere o desconto se o cupom for inválido
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
                />

                <button className="flex items-center gap-2 bg-cyan-600 rounded-md p-2 text-cyan-50" onClick={verifycupom}>
                    Aplicar
                    <BiSolidCoupon />
                </button>

            </div>
            {discount > 0 && <p>Desconto: {discount}%</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Cupom;
