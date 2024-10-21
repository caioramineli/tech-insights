import { useEffect } from 'react';
import InputModerno from '../../../components/InputModerno';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateCPF, validateCardNumber } from '../../../components/Validations';
import { useCarrinho } from '../../../contexts/contex-Cart';
import SelectModerno from '../../../components/SelectModerno';

const FormCartao = ({ dadosCartao, setDadosCartao }) => {
    const { formaPagamento, setCartao, calcularValorFinal } = useCarrinho();

    const notifySuccess = () => toast.success("Cartão salvo!");
    const notifyError = (message) => toast.error(message);

    useEffect(() => {
        setCartao(dadosCartao);
    }, [setCartao, dadosCartao]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDadosCartao({ ...dadosCartao, [name]: value });
    };

    function formatarPreco(preco) {
        return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    const handleChangeValidade = (e) => {
        let valor = e.target.value;

        valor = valor.replace(/\D/g, "");

        if (valor.length > 2) {
            valor = valor.slice(0, 2) + "/" + valor.slice(2);
        }

        let mes = valor.slice(0, 2);
        if (mes > 12) {
            valor = "12" + valor.slice(2);
        }

        setDadosCartao({ ...dadosCartao, validade: valor });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateCardNumber(dadosCartao.numero)) {
            notifyError("Número do cartão inválido");
            return;
        }

        if (!validateCPF(dadosCartao.cpfTitular)) {
            notifyError("Informe um CPF válido.");
            return;
        }

        if (dadosCartao.validade.length < 5) {
            notifyError("Data de validade inválida.");
            return;
        }

        if (dadosCartao.cvv.length < 3) {
            notifyError("CVV inválido.");
            return;
        }

        if (formaPagamento === 'Cartão') {
            setDadosCartao({ ...dadosCartao, status: true });
            notifySuccess()
        }
    };

    return (
        <form method="POST" onSubmit={handleSubmit} className='flex flex-col gap-4 mt-2'>
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5'>
                <InputModerno
                    name="numero"
                    type="text"
                    placeholder="4444 4444 4444 4444"
                    value={dadosCartao.numero}
                    onChange={handleChange}
                    label="Número do cartão"
                    mask="9999 9999 9999 9999"
                />
                <InputModerno
                    name="nomeTitular"
                    type="text"
                    placeholder="Caio Ramineli"
                    value={dadosCartao.nomeTitular}
                    onChange={handleChange}
                    label="Nome do Titular"
                    required
                />

                <InputModerno
                    name="validade"
                    type="text"
                    placeholder="12/24"
                    value={dadosCartao.validade}
                    onChange={handleChangeValidade}
                    label="Validade do Cartão"
                    required
                    max={5}
                />

                <InputModerno
                    name="cvv"
                    type="text"
                    placeholder="123"
                    value={dadosCartao.cvv}
                    onChange={handleChange}
                    label="Código de verificação"
                    required
                    max={3}
                />

                <InputModerno
                    name="cpfTitular"
                    type="text"
                    placeholder=""
                    value={dadosCartao.cpfTitular}
                    onChange={handleChange}
                    label="CPF do Titular"
                    required
                    mask="999.999.999-99"
                />

                <SelectModerno
                    name="parcelas"
                    value={dadosCartao.parcelas}
                    onChange={handleChange}
                    label="Parcelamento"
                    bgLabel="white"
                    options={Array.from({ length: 10 }, (_, index) => {
                        const parcelas = index + 1;
                        const valorParcela = calcularValorFinal / parcelas;

                        return {
                            value: `${parcelas}x`,
                            label: `${parcelas}x de ${formatarPreco(valorParcela)}`,
                        };
                    })}
                />
            </div>
            <div>
                <div className='flex justify-end gap-4'>
                    <button className='bg-emerald-600 rounded-md py-2 px-6 font-bold text-emerald-50' type='subimit'>Salvar</button>
                </div>
            </div>
        </form>
    );
}

export { FormCartao };