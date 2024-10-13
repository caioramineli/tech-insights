import axios from 'axios';
import { useState } from 'react';
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';
import Loading from '../../../components/Loading';

const FormDados = ({ reqUserData, user }) => {
    const api = process.env.REACT_APP_API_URL;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userData, setUserData] = useState(reqUserData);    

    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const validateName = (name) => {
        return name.length >= 3;
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validateDate = (date) => {
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
        return dateRegex.test(date);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
        return phoneRegex.test(phone);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!validateName(userData.nome)) {
            notifyError("O nome deve ter pelo menos 3 caracteres.");
            setIsSubmitting(false);
            return;
        }

        if (!validateDate(userData.dataNascimento)) {
            notifyError("Data de nascimento inválida. Use o formato DD/MM/AAAA.");
            setIsSubmitting(false);
            return;
        }

        if (!validatePhone(userData.telefone)) {
            notifyError("Telefone inválido. Use o formato DDD+número.");
            setIsSubmitting(false);
            return;
        }

        if (!validateEmail(userData.email)) {
            notifyError("Informe um E-mail válido.");
            setIsSubmitting(false);
            return;
        }

        try {
            await axios.put(api + 'user/' + user.id, userData);
            notifySuccess("Cadastro atualizado com sucesso!");
        } catch (error) {
            const erro = error.response?.data?.msg || "Erro ao atualizar o cadastro.";
            notifyError(erro);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form method="POST" onSubmit={handleSubmit} className="flex flex-col gap-4 bsPadrao p-4 bg-white rounded-md">
            <h1 className="font-semibold text-emerald-600 text-lg">Alterar os dados do cadastro</h1>
            <div className="grid sm:grid-cols-2 gap-4">
                <div className="divInputModerno">
                    <input
                        name="nome"
                        type="text"
                        placeholder="Nome "
                        value={userData.nome}
                        onChange={handleChange}
                    />
                    <label>
                        Nome completo
                    </label>
                </div>
                <div className="divInputModerno">
                    <input
                        name="cpf"
                        type="text"
                        placeholder=""
                        value={userData.cpf}
                        onChange={handleChange}
                        className="!cursor-no-drop"
                        disabled
                    />
                    <label>
                        CPF
                    </label>
                </div>
                <div className="divInputModerno">
                    <InputMask
                        mask="99/99/9999"
                        value={userData.dataNascimento}
                        onChange={handleChange}
                    >
                        {() => (
                            <input
                                name="dataNascimento"
                                type="text"
                                placeholder=""
                            />
                        )}
                    </InputMask>
                    <label>
                        Data de nascimento
                    </label>
                </div>
                <div className="divInputModerno">
                    <InputMask
                        mask="(99) 99999-9999"
                        value={userData.telefone}
                        onChange={handleChange}
                    >
                        {() => (
                            <input
                                name="telefone"
                                type="text"
                                placeholder=""
                            />
                        )}
                    </InputMask>
                    <label>
                        Telefone celular
                    </label>
                </div>
                <div className="divInputModerno">
                    <input
                        name="email"
                        type="email"
                        placeholder="exemplo@gmail.com"
                        value={userData.email}
                        onChange={handleChange}
                    />
                    <label>
                        E-mail
                    </label>
                </div>
            </div>
            {isSubmitting ? (
                <div className='flex justify-center w-full sm:w-64 h-[2.65rem] sm:!ml-auto items-center'>
                    <Loading color="#047857" />
                </div>
            ) : (
                <button type="submit" className="w-full sm:w-64 sm:!ml-auto shadow-md btnPadrao">
                    Salvar
                </button>
            )}
        </form>
    );
}

export default FormDados;