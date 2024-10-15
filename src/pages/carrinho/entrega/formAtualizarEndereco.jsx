import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../components/Loading';
import InputModerno from '../../../components/InputModerno';

const FormCadastrarEndereco = ({ setEstado, userId, onEnderecoCadastrado, formData, setFormData }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const api = process.env.REACT_APP_API_URL;

    const notifySuccess = () => toast.success("Endereço atualizado com sucesso!");
    const notifyError = (message) => toast.error(message);

    function closeFormEnderecoModal() {
        setEstado(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const cepPuro = formData.cep.replace(/\D/g, '');
        if (cepPuro.length !== 8) {
            notifyError("Informe um CEP válido");
            setIsSubmitting(false);
            return;
        }

        try {
            await axios.put(`${api}user/${userId}/endereco`, formData);
            notifySuccess();
            onEnderecoCadastrado();
            setFormData({
                enderecoId: '',
                nome: '',
                cep: '',
                rua: '',
                numero: '',
                complemento: '',
                bairro: '',
                cidade: '',
                estado: ''
            });
            closeFormEnderecoModal();
        } catch (error) {
            const erro = error.response?.data?.msg || "Erro ao realizar o cadastro.";
            notifyError(erro);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <>
            <h1 className='text-xl mb-2'>Atualizar Endereço de Entrega</h1>
            <form method="PUT" onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div className='grid grid-cols-3 gap-4'>
                    <InputModerno
                        name="nome"
                        type="text"
                        placeholder="Minha casa"
                        value={formData.nome}
                        onChange={handleChange}
                        label="Nome do endereço"
                        required
                    />
                    <InputModerno
                        name="cep"
                        type="text"
                        placeholder=""
                        value={formData.cep}
                        onChange={handleChange}
                        label="CEP"
                        mask="99999-999"
                    />
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <InputModerno
                        name="rua"
                        type="text"
                        placeholder="Ex: Rua Teresina"
                        value={formData.rua}
                        onChange={handleChange}
                        label="Rua"
                        required
                    />

                    <InputModerno
                        name="numero"
                        type="text"
                        placeholder="Ex: 1000"
                        value={formData.numero}
                        onChange={handleChange}
                        label="Número"
                        required
                    />

                    <InputModerno
                        name="complemento"
                        type="text"
                        placeholder="Casa verde"
                        value={formData.complemento}
                        onChange={handleChange}
                        label="Complemento"
                        required
                    />

                    <InputModerno
                        name="bairro"
                        type="text"
                        placeholder="Centro"
                        value={formData.bairro}
                        onChange={handleChange}
                        label="Bairro"
                        required
                    />

                    <InputModerno
                        name="estado"
                        type="text"
                        placeholder="SP"
                        value={formData.estado}
                        onChange={handleChange}
                        label="Estado"
                        required
                    />

                    <InputModerno
                        name="cidade"
                        type="text"
                        placeholder="Presidente Prudente"
                        value={formData.cidade}
                        onChange={handleChange}
                        label="Cidade"
                        required
                    />
                </div>

                <div>
                    {isSubmitting ? (
                        <div className='flex justify-center h-[3.42rem] items-center'>
                            <Loading color="#047857" />
                        </div>
                    ) : (
                        <div className='flex justify-end gap-4'>
                            <button className='bg-gray-300 rounded-md py-2 px-6' type='button' onClick={closeFormEnderecoModal}>Cancelar</button>
                            <button className='bg-emerald-600 rounded-md py-2 px-6 font-bold text-emerald-50' type='subimit'>Salvar</button>
                        </div>
                    )}
                </div>
            </form>
            <hr />
        </>
    );
}

export default FormCadastrarEndereco;