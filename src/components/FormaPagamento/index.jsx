import React, { useState } from 'react';
import './style.css'
import { FaBarcode, FaRegCreditCard } from "react-icons/fa";
import { SiPix } from "react-icons/si";

function FormaPagamento({ valorPrazo, valor }) {
    const [toggle, setToggle] = useState(1);
    const precos = []

    function updateToglle(id) {
        setToggle(id);
    }

    function formatarPreco(preco) {
        return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }

    for (let index = 1; index <= 10; index++) {
        precos.push(valorPrazo / index);
    }

    return (
        <>
            <h3 className='font-bold text-lg md:text-2xl flex justify-center mb-6'>FORMAS DE PAGAMENTO</h3>

            <div className='flex w-[95%] sm:w-11/12 m-auto justify-between mb-6'>
                <button className='flex flex-col items-center gap-1 text-sm sm:text-base' onClick={() => updateToglle(1)}>
                    <FaRegCreditCard className={toggle === 1 ? 'text-teal-600 text-2xl sm:text-4xl' : 'text-zinc-400 text-2xl sm:text-4xl'} />
                    Cartão de Crédito
                </button>

                <button className='flex flex-col items-center gap-1 text-sm sm:text-base' onClick={() => updateToglle(2)}>
                    <SiPix className={toggle === 2 ? 'text-teal-600 text-2xl sm:text-4xl' : 'text-zinc-400 text-2xl sm:text-4xl'} />
                    PIX
                </button>

                <button className='flex flex-col items-center gap-1 text-sm sm:text-base' onClick={() => updateToglle(3)}>
                    <FaBarcode className={toggle === 3 ? 'text-teal-600 text-2xl sm:text-4xl' : 'text-zinc-400 text-2xl sm:text-4xl'} />
                    Boleto Bancário
                </button>
            </div>

            <ul className={toggle === 1 ? 'flex flex-col w-[95%] sm:w-11/12 m-auto' : 'hidden'}>
                {precos.map((preco, index) => (
                    <li
                        key={index}
                        className={`flex justify-between text-sm sm:text-base p-1 ${index % 2 === 0 ? 'bg-zinc-200' : ''}`}
                    >
                        <span>{index + 1}x sem juros de {formatarPreco(preco)}</span>
                        <span>Total: {formatarPreco(precos[0])}</span>
                    </li>
                ))}
            </ul>

            <div className={toggle === 2 ? 'flex flex-col items-center gap-2 w-[95%] sm:w-11/12 m-auto' : 'hidden'}>
                <h1 className='text-2xl text-teal-700 font-bold'>{formatarPreco(valor)}</h1>
                <p className='font-bold'>À vista no Pix com 10% OFF</p>
                <hr className='border border-teal-600 w-full' />
                <p>Pague com o PIX e priorizamos o despacho em 1 hora!</p>
            </div>

            <div className={toggle === 3 ? 'flex flex-col items-center gap-2 w-[95%] sm:w-11/12 m-auto' : 'hidden'}>
                <h1 className='text-2xl text-teal-700 font-bold'>{formatarPreco(valor)}</h1>
                <p className='font-bold'>À vista no Boleto com 10% OFF</p>
                <hr className='border border-teal-600 w-full' />
                <p>O prazo de pagamento via boleto bancário é de 2 dias corridos.</p>
            </div>
        </>
    )
}
export default FormaPagamento;