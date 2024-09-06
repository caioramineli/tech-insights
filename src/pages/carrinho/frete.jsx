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
    const { calcularFrete, frete, freteSelecionado, setFreteSelecionado, atualizarFrete } = useCarrinho();

    const notifyError = (text) => toast.error(text);

    const handleCalcularFrete = async () => {
        setIsCalculatingFrete(true);

        setTimeout(() => {
            const cep = valorCep.replace(/\D/g, '');
            if (cep.length === 8) {
                calcularFrete();
            } else {
                notifyError("Digite um cep válido!")
                atualizarFrete({ normal: 0, expresso: 0 });
            }

            setIsCalculatingFrete(false);
        }, 1000);
    };

    const handleFreteChange = (e) => {
        setFreteSelecionado(e.target.value);
    };

    return (
        <div className="flex flex-col bg-white rounded-md bsPadrao p-4 gap-2">
            <h3 className="text-lg font-bold">Calcular Frete e Prazos</h3>
            <div className="flex gap-2">
                <InputMask
                    mask="99999-999"
                    value={valorCep}
                    onChange={(e) => setValorCep(e.target.value)}
                >
                    {() => (
                        <input
                            className="border border-zinc-400 rounded-md px-2 w-full outline-none focus:border-cyan-700"
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
                        className="flex items-center justify-center gap-2 bg-cyan-600 rounded-md p-2 text-cyan-50"
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

            {frete && frete.normal > 0 && frete.expresso > 0 && (
                <div className="flex flex-col gap-1">
                    <label className="flex gap-2">
                        <input
                            type="radio"
                            name="frete"
                            value="normal"
                            checked={freteSelecionado === 'normal'}
                            onChange={handleFreteChange}
                        />
                        Frete Normal: R$ {frete.normal.toFixed(2)}
                    </label>
                    <label className="flex gap-2">
                        <input
                            type="radio"
                            name="frete"
                            value="expresso"
                            checked={freteSelecionado === 'expresso'}
                            onChange={handleFreteChange}
                        />
                        Frete Expresso: R$ {frete.expresso.toFixed(2)}
                    </label>
                </div>
            )}
        </div>
    );
};

export default Frete;