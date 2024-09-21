import './style.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import InputMask from 'react-input-mask';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../components/Loading';
import BtnCadastrar from '../../components/BtnCadastrar';
import InputPassword from '../../components/InputPassword';

export default function Cadastrar() {
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        dataNascimento: '',
        telefone: '',
        email: '',
        senha: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);

    const notifySuccess = () => toast.success("Cadastro realizado com sucesso!");
    const notifyError = (message) => toast.error(message);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateName = (name) => {
        return name.length >= 3;
    };

    const validateCPF = (cpf) => {
        // Remove caracteres não numéricos
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

        let soma = 0;
        for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
        let resto = 11 - (soma % 11);
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(9))) return false;

        soma = 0;
        for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
        resto = 11 - (soma % 11);
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(10))) return false;

        return true;
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

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validações
        if (!validateName(formData.nome)) {
            notifyError("O nome deve ter pelo menos 3 caracteres.");
            setIsSubmitting(false);
            return;
        }

        if (!validateCPF(formData.cpf)) {
            notifyError("Informe um CPF válido.");
            setIsSubmitting(false);
            return;
        }

        if (!validateDate(formData.dataNascimento)) {
            notifyError("Data de nascimento inválida. Use o formato DD/MM/AAAA.");
            setIsSubmitting(false);
            return;
        }

        if (!validatePhone(formData.telefone)) {
            notifyError("Telefone inválido. Use o formato DDD+número.");
            setIsSubmitting(false);
            return;
        }

        if (!validateEmail(formData.email)) {
            notifyError("Informe um E-mail válido.");
            setIsSubmitting(false);
            return;
        }

        if (!validatePassword(formData.senha)) {
            notifyError("A senha deve ter pelo menos 6 caracteres.");
            setIsSubmitting(false);
            return;
        }

        if (!isTermsAccepted) {
            notifyError("Você deve aceitar os termos e condições.");
            setIsSubmitting(false);
            return;
        }

        try {
            await axios.post('https://backend-tech-insights.vercel.app/register', formData);
            setFormData({
                nome: '',
                cpf: '',
                dataNascimento: '',
                telefone: '',
                email: '',
                senha: ''
            });
            notifySuccess();
        } catch (error) {
            const erro = error.response?.data?.msg || "Erro ao realizar o cadastro.";
            notifyError(erro);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div id="containerCadastrar">
            <ToastContainer />
            <form method="POST" onSubmit={handleSubmit}>
                <h1>Cadastrar-se</h1>
                <div id='containerInputs'>
                    <input
                        name="nome"
                        type="text"
                        placeholder="Nome completo"
                        value={formData.nome}
                        onChange={handleChange}
                    />
                    <InputMask
                        mask="999.999.999-99"
                        value={formData.cpf}
                        onChange={handleChange}
                    >
                        {() => (
                            <input
                                name="cpf"
                                type="text"
                                placeholder="CPF"

                            />
                        )}
                    </InputMask>
                    <InputMask
                        mask="99/99/9999"
                        value={formData.dataNascimento}
                        onChange={handleChange}
                    >
                        {() => (
                            <input
                                name="dataNascimento"
                                type="text"
                                placeholder="Data de nascimento"
                            />
                        )}
                    </InputMask>
                    <InputMask
                        mask="(99) 99999-9999"
                        value={formData.telefone}
                        onChange={handleChange}
                    >
                        {() => (
                            <input
                                name="telefone"
                                type="text"
                                placeholder="Telefone celular"
                            />
                        )}
                    </InputMask>
                    <input
                        name="email"
                        type="email"
                        placeholder="E-mail"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <InputPassword
                        placeholder={"Insira sua senha"}
                        value={formData.senha}
                        event={handleChange}
                    />
                </div>

                <div className='termos'>
                    <span id='spanCheckbox'>
                        <input
                            type="checkbox"
                            id="checkboxTermos"
                            checked={isTermsAccepted}
                            onChange={() => setIsTermsAccepted(!isTermsAccepted)}
                        />
                    </span>
                    <label htmlFor="checkboxTermos">
                        Li e estou de acordo com as <span>políticas da empresa e políticas de privacidade.</span>
                    </label>
                </div>

                <div className='btnCarregamento'>

                    {isSubmitting ? (
                        <div className='flex justify-center h-[3.42rem] items-center'>
                            <Loading color = "#047857" />
                        </div>
                    ) : (
                        <BtnCadastrar />
                    )}
                </div>

                <div id="voltar-login">
                    <p>Já possui cadastro?</p>
                    <Link to="/login">Fazer Login</Link>
                </div>
            </form>

        </div>
    );
}
