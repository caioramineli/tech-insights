import axios from 'axios';
import { useState } from 'react';
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../components/Loading';

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
                    <div className='divInputModerno'>
                        <input
                            name="nome"
                            type="text"
                            placeholder="Minha casa"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />
                        <label>
                            Nome do endereço
                        </label>
                    </div>

                    <div className='divInputModerno'>
                        <InputMask
                            mask="99999-999"
                            value={formData.cep}
                            onChange={handleChange}
                        >
                            {() => (
                                <input
                                    name="cep"
                                    type="text"
                                    placeholder=""
                                />
                            )}
                        </InputMask>
                        <label>
                            CEP
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="divInputModerno">
                        <input
                            name="rua"
                            type="text"
                            placeholder="Ex: Rua Teresina"
                            value={formData.rua}
                            onChange={handleChange}
                            required
                        />
                        <label>
                            Rua
                        </label>
                    </div>
                    <div className="divInputModerno">
                        <input
                            name="numero"
                            type="text"
                            placeholder="Ex: 1000"
                            value={formData.numero}
                            onChange={handleChange}
                            required
                        />
                        <label>
                            Número
                        </label>
                    </div>
                    <div className="divInputModerno">
                        <input
                            name="complemento"
                            type="text"
                            placeholder="Casa verde"
                            value={formData.complemento}
                            onChange={handleChange}
                            required
                        />
                        <label>
                            Complemento
                        </label>
                    </div>
                    <div className="divInputModerno">
                        <input
                            name="bairro"
                            type="text"
                            placeholder="Centro"
                            value={formData.bairro}
                            onChange={handleChange}
                            required
                        />
                        <label>
                            Bairro
                        </label>
                    </div>
                    <div className="divInputModerno">
                        <input
                            name="estado"
                            type="text"
                            placeholder="SP"
                            value={formData.estado}
                            onChange={handleChange}
                            required
                        />
                        <label>
                            Estado
                        </label>
                    </div>
                    <div className="divInputModerno">
                        <input
                            name="cidade"
                            type="text"
                            placeholder="Presidente Prudente"
                            value={formData.cidade}
                            onChange={handleChange}
                            required
                        />
                        <label>
                            Cidade
                        </label>
                    </div>
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