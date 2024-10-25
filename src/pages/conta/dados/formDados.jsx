import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Loading from '../../../components/Loading';
import InputModerno from '../../../components/InputModerno';
import { validateName, validateEmail, validateDate, validatePhone } from '../../../components/Validations';

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
                <InputModerno
                    name="nome"
                    type="text"
                    placeholder="Nome"
                    value={userData.nome}
                    onChange={handleChange}
                    label="Nome completo"
                />

                <InputModerno
                    name="cpf"
                    type="text"
                    placeholder=""
                    value={userData.cpf}
                    onChange={handleChange}
                    label="CPF"
                    className='!cursor-no-drop'
                    readOnly
                />

                <InputModerno
                    name="dataNascimento"
                    type="text"
                    placeholder="Centro"
                    value={userData.dataNascimento}
                    onChange={handleChange}
                    label="Data de nascimento"
                    mask="99/99/9999"
                />

                <InputModerno
                    name="telefone"
                    type="text"
                    placeholder="Centro"
                    value={userData.telefone}
                    onChange={handleChange}
                    label="Telefone celular"
                    mask="(99) 99999-9999"
                />

                <InputModerno
                    name="email"
                    type="email"
                    placeholder="exemplo@gmail.com"
                    value={userData.email}
                    onChange={handleChange}
                    label="E-mail"
                />
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