import React from 'react';
import './style.css'
import { FaBarcode, FaRegCreditCard } from "react-icons/fa";
import { SiPix } from "react-icons/si";
import { useState } from 'react';

function FormaPagamento(){
    const [toggle, setToggle] = useState(1);

    function updateToglle(id){
        setToggle(id);
    }

    return(
        <div className='flex flex-col gap-10'>
            <div className='flex m-auto gap-1 items-center text-xl'>
                <h3 className='font-bold text-2xl'>FORMAS DE PAGAMENTO</h3>
            </div>

            <div className='flex w-4/5 m-auto justify-between'>
                <button className='flex flex-col items-center gap-1' onClick={() => updateToglle(1)}>
                    <FaRegCreditCard className={toggle === 1?'text-teal-600 text-4xl':'text-zinc-400 text-4xl'}/>
                    Cartão de Crédito
                </button>

                <button className='flex flex-col items-center gap-1' onClick={() => updateToglle(2)}>
                    <SiPix className={toggle === 2?'text-teal-600 text-4xl':'text-zinc-400 text-4xl'}/>
                    PIX
                </button>

                <button className='flex flex-col items-center gap-1' onClick={() => updateToglle(3)}>
                    <FaBarcode className={toggle === 3?'text-teal-600 text-4xl':'text-zinc-400 text-4xl'}/>
                    Boleto Bancário
                </button>
            </div>

            <div className={toggle === 1?'show-content':'content'}>
                <li className='bg-slate-200'>À vista - Até 10% de desconto</li>
                <li>2x sem juros</li>
                <li className='bg-slate-200'>3x sem juros</li>
                <li>4x sem juros</li>
                <li className='bg-slate-200'>5x sem juros</li>
                <li>6x sem juros</li>
                <li className='bg-slate-200'>7x sem juros</li>
                <li>8x sem juros</li>
                <li className='bg-slate-200'>9x sem juros</li>
                <li>10x sem juros</li>
            </div>

            <div className={toggle === 2?'show-content':'content'}>
                <h1>(VALOR DO PRODUTO)</h1>
                <p>À vista no Pix com 10% OFF</p>
            </div>

            <div className={toggle === 3?'show-content':'content'}>
                <h1>(VALOR DO PRODUTO)</h1>
                <p>À vista no Boleto com 5% OFF</p>
                <p>O prazo de pagamento via boleto bancário é de 2 dias corridos.</p>
            </div>
        </div>
    )
}
export default FormaPagamento;
// export default function FormaPagamento(){
//     return (
//         <>
        
//         </>
//     )
// }