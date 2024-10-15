import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import InputModerno from '../../components/InputModerno';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../components/Loading';
import BtnCadastrar from '../../components/BtnCadastrar';
import InputPassword from '../../components/InputPassword';
import { AuthContext } from '../../contexts/AuthContext';
import { validateName, validateCPF, validateEmail, validateDate, validatePhone, validatePassword } from '../../components/Validations';

export default function Cadastrar() {
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        dataNascimento: '',
        telefone: '',
        email: '',
        senha: ''
    });

    const [chatBotData, setChatBotData] = useState({
        phone: "",
        message: ""
    });

    const { login } = useContext(AuthContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const api = process.env.REACT_APP_API_URL;
    const apiChatBot = process.env.REACT_APP_API_CHATBOT;

    const navigate = useNavigate();
    const notifySuccess = () => toast.success("Cadastro realizado com sucesso!");
    const notifyError = (message) => toast.error(message);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
 
    useEffect(() => {
        const sendChatBotData = async () => {
            if (chatBotData.phone !== "") {
                try {
                    await axios.post(apiChatBot, chatBotData);
                } catch (error) {
                    console.error("Erro ao enviar dados para o chatbot:", error);
                }
            }
        };
        sendChatBotData();
    }, [chatBotData, apiChatBot]);
    

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
            setChatBotData({
                phone: formData.telefone,
                message: `Olá ${formData.nome}, bem vindo a Tech Insights! Se tiver alguma dúvida estou a disposição.`
            });

            await axios.post(api + 'register', formData);

            const response = await axios.post(api + 'login', {
                email: formData.email,
                senha: formData.senha
            });

            setFormData({
                nome: '',
                cpf: '',
                dataNascimento: '',
                telefone: '',
                email: '',
                senha: ''
            });

            localStorage.setItem('token', response.data.token);
            login(response.data.token);

            notifySuccess();

            setTimeout(() => {
                navigate('/');
            }, 1500);
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
                <h1 className='flex justify-center text-emerald-600 font-bold text-2xl sm:text-3xl'>Cadastrar-se</h1>
                <div id='containerInputs'>
                    <InputModerno
                        name="nome"
                        type="text"
                        placeholder="Nome"
                        value={formData.nome}
                        onChange={handleChange}
                        label="Nome completo"
                        bgLabel="slate-100"
                    />
                    <InputModerno
                        name="cpf"
                        type="text"
                        placeholder=""
                        value={formData.cpf}
                        onChange={handleChange}
                        label="CPF"
                        bgLabel="slate-100"
                        mask="999.999.999-99"
                    />
                    <InputModerno
                        name="dataNascimento"
                        type="text"
                        placeholder=""
                        value={formData.dataNascimento}
                        onChange={handleChange}
                        label="Data de nascimento"
                        bgLabel="slate-100"
                        mask="99/99/9999"
                    />
                    <InputModerno
                        name="telefone"
                        type="text"
                        placeholder=""
                        value={formData.telefone}
                        onChange={handleChange}
                        label="Telefone celular"
                        bgLabel="slate-100"
                        mask="(99) 99999-9999"
                    />
                    <InputModerno
                        name="email"
                        type="email"
                        placeholder="exemplo@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        label="E-mail"
                        bgLabel="slate-100"
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
                            <Loading color="#047857" />
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
