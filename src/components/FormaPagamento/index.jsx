import React from 'react';
import Modal from "react-modal";
import './style.css'


function FormaPagamento(){
    const [isCartaoCreditoModalOpen, setIsCartaoCreditoModalOpen] = useState(false);
    
    function openCartaoCreditoModal() {
        setIsCartaoCreditoModalOpen(true);
    }

    function closeCartaoCreditoModal() {
        setIsCartaoCreditoModalOpen(false);
    }

    return(
        <div className='ContainerCartaoCredito'>
            <button onClick={openCartaoCreditoModal}></button>
                <li>À vista - Até 10% de desconto</li>
                <li>2x sem juros</li>
                <li>3x sem juros</li>
                <li>4x sem juros</li>
                <li>5x sem juros</li>
                <li>6x sem juros</li>
                <li>7x sem juros</li>
                <li>8x sem juros</li>
                <li>9x sem juros</li>
                <li>10x sem juros</li>
        </div>

        // <div className='ContainerPix'>
        // <h1>(VALOR DO PRODUTO)</h1>
        // <p>À vista no Pix com 10% OFF</p>
        // </div>

        // <div className='ContainerBoletoBancario'>
        // <h1>(VALOR DO PRODUTO)</h1>
        // <p>À vista no Boleto com 5% OFF</p>
        // </div>
        //<hr>
        // <p>O prazo de pagamento via boleto bancário é de 2 dias corridos.</p>
    )
}
export default FormaPagamento;
// export default function FormaPagamento(){
//     return (
//         <>
        
//         </>
//     )
// }