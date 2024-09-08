import React from 'react';
import { MdShoppingCart } from 'react-icons/md';
import { FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdAttachMoney } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";


export default function StepBar() {
    return (
        <div className='flex items-center w-full bg-white h-16 bsPadrao'>
            <div className='flex items-center w-4/5 justify-between m-auto gap-2 max-w-[1300px]'>
                <div className='flex items-center gap-2'>
                    <MdShoppingCart className='text-teal-500 gap-2 text-xl' />
                    <span>Carrinho</span>
                </div>
                <hr className='border-teal-500 border w-full' />
                <div className='flex items-center gap-2'>
                    <FaUser className='text-teal-500 text-xl' />
                    <span>Identificação</span>
                </div>
                <hr className='border-teal-500 border w-full' />
                <div className='flex items-center gap-2'>
                    <FaLocationDot className='text-teal-500 text-xl' />
                    <span>Entrega</span>
                </div>
                <hr className='border-teal-500 border w-full' />
                <div className='flex items-center gap-2'>
                    <MdAttachMoney className='text-teal-500 text-xl' />
                    <span>Pagamento</span>
                </div>
                <hr className='border-teal-500 border w-full' />
                <div className='flex items-center gap-2'>
                    <FaCheckCircle className='text-teal-500 text-xl' />
                    <span>Confirmação</span>
                </div>
            </div>
        </div>
    );
}