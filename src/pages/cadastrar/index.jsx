import './style.css';
import { IoCreateOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../components/Loading';

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

    const notifySuccess = () => toast.success("Cadastro realizado com sucesso!");
    const notifyError = (text) => toast.success({text});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

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
            if (error.response) {
                notifyError(error.response.data.msg);
            } else {
                notifyError('Erro ao se cadastrar!');
            }
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
                        required
                    />
                    <input
                        name="cpf"
                        type="text"
                        placeholder="CPF"
                        value={formData.cpf}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="dataNascimento"
                        type="text"
                        placeholder="Data de nascimento"
                        value={formData.dataNascimento}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="telefone"
                        type="text"
                        placeholder="Telefone celular"
                        value={formData.telefone}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="E-mail"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        name="senha"
                        type="password"
                        placeholder="Senha"
                        value={formData.senha}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='termos'>
                    <span id='spanCheckbox'>
                        <input
                            type="checkbox"
                            id="checkboxTermos"
                        />
                    </span>
                    <label htmlFor="checkboxTermos">
                        Li e estou de acordo com as <span>políticas da empresa e políticas de privacidade.</span>
                    </label>
                </div>

                <div className='btnCarregamento'>
                    {isSubmitting ? (
                        <Loading color='#059669' />
                    ) : (
                        <button type='submit'>
                            Criar
                            <IoCreateOutline />
                        </button>
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
