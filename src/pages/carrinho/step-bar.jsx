import React from 'react';
import { MdShoppingCart } from 'react-icons/md';
import { FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";


export default function StepBar({ step = 1 }) {

    return (
        <div className='flex items-center w-full bg-white h-16 bsPadrao'>
            <div className='flex items-center w-[90%] xl:w-4/5 justify-between m-auto gap-2 max-w-[1300px]'>
                <div className='flex items-center gap-2'>
                    <MdShoppingCart size={25} className={`text-emerald-600 gap-2 ${step < 1 ? 'text-zinc-300' : ''}`} />
                    <span className='hidden md:block'>Carrinho</span>
                </div>
                <hr className={`border-emerald-600 border w-full ${step <= 1 ? 'border-zinc-300' : ''}`} />

                <div className='flex items-center gap-2'>
                    <FaUser size={22} className={`text-emerald-600 gap-2 ${step <= 1 ? 'text-zinc-300' : ''}`} />
                    <span className='hidden md:block'>Identificação</span>
                </div>
                <hr className={`border-emerald-600 border w-full ${step <= 2 ? 'border-zinc-300' : ''}`} />

                <div className='flex items-center gap-2'>
                    <FaLocationDot size={23} className={`text-emerald-600 gap-2 ${step <= 2 ? 'text-zinc-300' : ''}`} />
                    <span className='hidden md:block'>Entrega</span>
                </div>
                <hr className={`border-emerald-600 border w-full ${step <= 3 ? 'border-zinc-300' : ''}`} />

                <div className='flex items-center gap-2'>
                    <AiFillDollarCircle size={25} className={`text-emerald-600 gap-2 ${step <= 3 ? 'text-zinc-300' : ''}`} />
                    <span className='hidden md:block'>Pagamento</span>
                </div>
                <hr className={`border-emerald-600 border w-full ${step <= 4 ? 'border-zinc-300' : ''}`} />

                <div className='flex items-center gap-2'>
                    <FaCheckCircle size={23} className={`text-emerald-600 gap-2 ${step <= 4 ? 'text-zinc-300' : ''}`} />
                    <span className='hidden md:block'>Confirmação</span>
                </div>
            </div>
        </div>
    );
}