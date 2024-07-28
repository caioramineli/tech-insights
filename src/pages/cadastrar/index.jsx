import './style.css';
import { IoCreateOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

export default function Cadastrar() {
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        dataNascimento: '',
        telefone: '',
        email: '',
        senha: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://backend-tech-insights.onrender.com/register', formData);
            setMessage(response.data.msg);
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.msg);
            } else {
                setMessage('Erro no servidor!');
            }
        }
    };

    return (
        <div id="containerCadastrar">
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
                    <input
                        name="cpf"
                        type="text"
                        placeholder="CPF"
                        value={formData.cpf}
                        onChange={handleChange}
                    />
                    <input
                        name="dataNascimento"
                        type="text"
                        placeholder="Data de nascimento"
                        value={formData.data_nasc}
                        onChange={handleChange}
                    />
                    <input
                        name="telefone"
                        type="text"
                        placeholder="Telefone celular"
                        value={formData.telefone}
                        onChange={handleChange}
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

                <button type='submit'>
                    Criar
                    <IoCreateOutline />
                </button>

                <div id="voltar-login">
                    <p>Já possui cadastro?</p>
                    <Link to="/login">Fazer Login</Link>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}