import axios from 'axios';
import { useState, useEffect, useCallback, useContext } from 'react';
import Loading from '../../components/Loading';
import InputModerno from '../../components/InputModerno';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../contexts/AuthContext';

const FormAtualizarEndereco = ({ setEstadoForm, userId, atualizarEnderecos, endereco, setEndereco }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cepAlterado, setCepAlterado] = useState(false);
    const [cepIncorreto, setCepIncorreto] = useState(false)
    const { token } = useContext(AuthContext);
    const api = process.env.REACT_APP_API_URL;

    const notifySuccess = () => toast.success("Endereço atualizado com sucesso!");
    const notifyError = (message) => toast.error(message);

    function closeModal() {
        setEstadoForm(false);
        document.body.style.overflow = 'auto';
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEndereco((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (name === "cep") {
            setCepAlterado(true);
        }
    };

    const buscarCEP = useCallback(async () => {
        try {
            const response = await axios.get(`https://brasilapi.com.br/api/cep/v1/${endereco.cep.replace(/\D/g, '')}`,
                { headers: { 'Authorization': `Bearer ${token}` } });
            const { street, neighborhood, city, state } = response.data;
            setCepIncorreto(false);

            setEndereco((prev) => ({
                ...prev,
                rua: street || '',
                bairro: neighborhood || '',
                cidade: city || prev.cidade,
                estado: state || prev.estado
            }));

            if (!street || !neighborhood) {
                setEndereco((prev) => ({
                    ...prev,
                    rua: '',
                    bairro: ''
                }));
            }
            setCepAlterado(false);
        } catch (error) {
            setCepIncorreto(true);
            notifyError("Erro ao buscar o CEP. Verifique e tente novamente.");
        }
    }, [endereco.cep, setEndereco, token]);

    useEffect(() => {
        if (cepAlterado && endereco.cep?.replace(/\D/g, '').length === 8) {
            buscarCEP();
        }
    }, [endereco.cep, cepAlterado, buscarCEP]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const cepPuro = endereco.cep.replace(/\D/g, '');

        if (cepPuro.length !== 8) {
            notifyError("Informe um CEP válido");
            setIsSubmitting(false);
            return;
        }

        if (cepIncorreto) {
            notifyError("O CEP informado não é válido.");
            setIsSubmitting(false);
            return;
        }

        try {
            await axios.put(`${api}user/${userId}/endereco/${endereco._id}`, endereco, { headers: { 'Authorization': `Bearer ${token}` } });
            notifySuccess();
            atualizarEnderecos();
            closeModal();
        } catch (error) {
            const erro = error.response?.data?.msg || "Erro ao atualizar endereço.";
            notifyError(erro);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form method="PUT" onSubmit={handleSubmit} className='flex flex-col gap-4 mt-2'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                <InputModerno
                    name="nome"
                    type="text"
                    placeholder="Minha casa"
                    value={endereco.nome}
                    onChange={handleChange}
                    label="Nome do endereço"
                    required
                />
                <InputModerno
                    name="cep"
                    type="text"
                    placeholder="CEP"
                    value={endereco.cep}
                    onChange={handleChange}
                    label="CEP"
                    mask="99999-999"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <InputModerno
                    name="rua"
                    type="text"
                    placeholder="Ex: Rua Teresina"
                    value={endereco.rua}
                    onChange={handleChange}
                    label="Rua"
                    required
                />

                <InputModerno
                    name="numero"
                    type="text"
                    placeholder="Ex: 1000"
                    value={endereco.numero}
                    onChange={handleChange}
                    label="Número"
                    required
                />

                <InputModerno
                    name="complemento"
                    type="text"
                    placeholder="Casa verde"
                    value={endereco.complemento}
                    onChange={handleChange}
                    label="Complemento"
                    required
                />

                <InputModerno
                    name="bairro"
                    type="text"
                    placeholder="Centro"
                    value={endereco.bairro}
                    onChange={handleChange}
                    label="Bairro"
                    required
                />

                <InputModerno
                    name="estado"
                    type="text"
                    placeholder="SP"
                    value={endereco.estado}
                    onChange={handleChange}
                    label="Estado"
                    required
                    className='!cursor-no-drop'
                    readOnly
                />

                <InputModerno
                    name="cidade"
                    type="text"
                    placeholder="Presidente Prudente"
                    value={endereco.cidade}
                    onChange={handleChange}
                    label="Cidade"
                    required
                    className='!cursor-no-drop'
                    readOnly
                />
            </div>
            <div>
                {isSubmitting ? (
                    <div className='flex justify-center h-[2.8rem] items-center'>
                        <Loading color="#047857" />
                    </div>
                ) : (
                    <div className='flex justify-end gap-4'>
                        <button className='bg-gray-300 rounded-md py-2 px-6' type='button' onClick={closeModal}>Cancelar</button>
                        <button className='bg-emerald-600 rounded-md py-2 px-6 font-bold text-emerald-50' type='submit'>Salvar</button>
                    </div>
                )}
            </div>
        </form>
    );
}

export { FormAtualizarEndereco };