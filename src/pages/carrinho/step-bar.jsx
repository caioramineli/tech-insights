import React from 'react';
import { MdShoppingCart } from 'react-icons/md';
import { FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdAttachMoney } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";


export default function StepBar({ step = 1 }) {

    return (
        <div className='flex items-center w-full bg-white h-16 bsPadrao'>
            <div className='flex items-center w-4/5 justify-between m-auto gap-2 max-w-[1300px]'>
                <div className='flex items-center gap-2'>
                    <MdShoppingCart className={`text-emerald-600 gap-2 text-xl ${step < 1 ? 'text-zinc-300' : ''}`} />
                    <span>Carrinho</span>
                </div>
                <hr className={`border-emerald-600 border w-full ${step <= 1 ? 'border-zinc-300' : ''}`} />

                <div className='flex items-center gap-2'>
                    <FaUser className={`text-emerald-600 gap-2 text-xl ${step <= 1 ? 'text-zinc-300' : ''}`} />
                    <span>Identificação</span>
                </div>
                <hr className={`border-emerald-600 border w-full ${step <=  2 ? 'border-zinc-300' : ''}`} />

                <div className='flex items-center gap-2'>
                    <FaLocationDot className={`text-emerald-600 gap-2 text-xl ${step <=  2 ? 'text-zinc-300' : ''}`} />
                    <span>Entrega</span>
                </div>
                <hr className={`border-emerald-600 border w-full ${step <=  3 ? 'border-zinc-300' : ''}`} />

                <div className='flex items-center gap-2'>
                    <MdAttachMoney className={`text-emerald-600 gap-2 text-xl ${step <=  3 ? 'text-zinc-300' : ''}`} />
                    <span>Pagamento</span>
                </div>
                <hr className={`border-emerald-600 border w-full ${step <=  4 ? 'border-zinc-300' : ''}`} />

                <div className='flex items-center gap-2'>
                    <FaCheckCircle className={`text-emerald-600 gap-2 text-xl ${step <=  4 ? 'text-zinc-300' : ''}`} />
                    <span>Confirmação</span>
                </div>
            </div>
        </div>
    );
}