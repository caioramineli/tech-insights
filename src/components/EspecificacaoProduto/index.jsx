import React, { useState, useRef } from 'react';
import { MdKeyboardArrowDown } from "react-icons/md";
import './style.css'

export default function EspecificacaoProduto({ especificacoes }) {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='containerEspecificacaoEDescricao'>
            <h2
                className='text-xl text-zinc-900 font-bold cursor-pointer flex justify-between items-center'
                onClick={toggleAccordion}
            >
                Especificações
                <span
                    className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                >
                    <MdKeyboardArrowDown className='text-4xl text-emerald-600' />
                </span>
            </h2>

            <div
                ref={contentRef}
                className='transition-height duration-300 ease-in-out overflow-hidden'
                style={{ height: isOpen ? `${contentRef.current.scrollHeight}px` : '0px' }}
            >
                <p className='text-sm md:text-base mt-2'>
                    {especificacoes}
                </p>
            </div>
        </div>
    );
}