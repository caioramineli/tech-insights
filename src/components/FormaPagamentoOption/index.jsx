import React from 'react';
import { IoMdRadioButtonOn, IoMdRadioButtonOff } from 'react-icons/io';

const FormaPagamento = ({ formaPagamento, tipo, onClick, icone, descricao, desconto }) => {
    return (
        <div
            onClick={() => onClick()}
            className={`border-emerald-600 flex justify-between items-center border gap-2 px-3 sm:px-4 py-2 rounded-md cursor-pointer ${formaPagamento !== tipo ? 'border-zinc-300' : ''}`}
        >
            <div className="flex items-center gap-2 sm:gap-4">
                <div className='min-w-6'>
                    <IoMdRadioButtonOn className={formaPagamento === tipo ? 'text-2xl sm:text-3xl text-emerald-600' : 'hidden'} />
                    <IoMdRadioButtonOff className={formaPagamento !== tipo ? 'text-2xl sm:text-3xl' : 'hidden'} />
                </div>
                <div className="flex flex-col">
                    <p className="text-sm sm:text-base font-semibold">{descricao}</p>
                    <p className="text-xs sm:text-sm">
                        {desconto}
                    </p>
                </div>
            </div>
            <div className='min-w-6'>{icone}</div>
        </div>
    );
};

export default FormaPagamento;