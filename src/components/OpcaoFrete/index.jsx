import { IoMdRadioButtonOn, IoMdRadioButtonOff } from 'react-icons/io';

const OpcaoFrete = ({ tipo, descricao, preco, prazo, freteAtual, onSelecionar }) => {
    return (
        <div
            onClick={() => onSelecionar(tipo)}
            className={
                `border-emerald-600 hover:border-emerald-600 
                 duration-200 
                 flex 
                 justify-between 
                 items-center 
                 border 
                 px-3 sm:px-4 
                 py-2 
                 rounded-md 
                 cursor-pointer 
                 text-sm md:text-base
                 gap-3
                 ${freteAtual !== tipo ? 'border-zinc-300' : ''}
                 `}
        >
            <div>
                <IoMdRadioButtonOn className={freteAtual === tipo ? 'text-3xl text-emerald-600' : 'hidden'} />
                <IoMdRadioButtonOff className={freteAtual !== tipo ? 'text-3xl' : 'hidden'} />
            </div>

            <div className='flex w-full flex-col sm:flex-row justify-between'>
                <span>{descricao} - R$ {preco}</span>
                <span>Entrega em: {prazo}</span>
            </div>
        </div>
    );
};

export default OpcaoFrete;
