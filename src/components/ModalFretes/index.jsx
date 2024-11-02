import { FaTruck } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const ModalFrete = ({ cep }) => {
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex gap-1 items-center text-xl'>
                <FaTruck className='text-emerald-600' />
                <h3 className='font-bold'>Frete e Prazo</h3>

            </div>

            <div className='flex gap-1 items-center text-lg'>
                <FaLocationDot className='text-emerald-600' />
                <h3 className='font-bold'>CEP {cep}</h3>
            </div>

            <div className='flex justify-between text-sm sm:text-base'>
                <h3 className='font-bold'>Entrega Normal</h3>
                <p>R$ 15,00 - até 8 dias úteis</p>
            </div>

            <div className='flex justify-between text-sm sm:text-base'>
                <h3 className='font-bold'>Entrega Expressa</h3>
                <p>R$ 30,00 - até 5 dias úteis</p>
            </div>
        </div>
    );
}

export default ModalFrete;