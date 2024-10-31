import { useState } from "react";
import { FaTruck } from "react-icons/fa6";
import InputMask from 'react-input-mask';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useCarrinho } from "../../contexts/contex-Cart";
import Loading from "../../components/Loading";

const Frete = () => {
    const [valorCep, setValorCep] = useState('');
    const [isCalculatingFrete, setIsCalculatingFrete] = useState(false);
    const [calculoFrete, setCalculoFrete] = useState(false);
    const { frete, escolhaFrete } = useCarrinho();

    const notifyError = (text) => toast.error(text);

    const handleCalcularFrete = async () => {
        setIsCalculatingFrete(true);

        setTimeout(() => {
            const cep = valorCep.replace(/\D/g, '');
            if (cep.length === 8) {
                setCalculoFrete(true);
                escolhaFrete('normal');
            } else {
                notifyError("Digite um cep válido!");
            }
            setIsCalculatingFrete(false);
        }, 1000);
    };

    const handleFreteChange = (e) => {
        escolhaFrete(e.target.value);
    };

    return (
        <div className="flex flex-col bg-white rounded-md bsPadrao p-4 gap-2">
            <h3 className="text-base sm:text-lg font-bold">Calcular Frete e Prazos</h3>
            <div className="flex gap-2">
                <InputMask
                    mask="99999-999"
                    value={valorCep}
                    onChange={(e) => setValorCep(e.target.value)}
                >
                    {() => (
                        <input
                            className="border border-zinc-400 rounded-md px-2 w-full outline-none focus:border-cyan-700 text-sm sm:text-base"
                            name="cep"
                            type="text"
                            placeholder="12345-678"
                        />
                    )}
                </InputMask>
                {isCalculatingFrete ? (
                    <div className='px-[2.125rem]'>
                        <Loading stroke='5' size='34' />
                    </div>
                ) : (
                    <button
                        className="flex items-center justify-center gap-2 bg-cyan-600 rounded-md p-2 text-cyan-50 text-sm sm:text-base"
                        onClick={handleCalcularFrete}
                        disabled={isCalculatingFrete}
                    >
                        <>
                            Calcular
                            <FaTruck />
                        </>
                    </button>
                )}
            </div>

            {calculoFrete && (
                <div className="flex flex-col gap-1">
                    <label className="flex gap-2">
                        <input
                            type="radio"
                            name="frete"
                            value="normal"
                            checked={frete.tipo === 'normal'}
                            onChange={handleFreteChange}
                        />
                        Frete Normal: R$ 15,00
                    </label>

                    <label className="flex gap-2">
                        <input
                            type="radio"
                            name="frete"
                            value="agendado"
                            checked={frete.tipo === 'agendado'}
                            onChange={handleFreteChange}
                        />
                        Frete Agendado: R$ 20,00
                    </label>

                    <label className="flex gap-2">
                        <input
                            type="radio"
                            name="frete"
                            value="expresso"
                            checked={frete.tipo === 'expresso'}
                            onChange={handleFreteChange}
                        />
                        Frete Expresso: R$ 30,00
                    </label>
                </div>
            )}
        </div>
    );
};

export default Frete;