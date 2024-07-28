import React, { useState } from 'react';
import axios from 'axios';

function App() {
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
        <div>
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
                </div>
                <div>
                    <label>CPF:</label>
                    <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} required />
                </div>
                <div>
                    <label>Data de Nascimento:</label>
                    <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} required />
                </div>
                <div>
                    <label>Telefone:</label>
                    <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Senha:</label>
                    <input type="password" name="senha" value={formData.senha} onChange={handleChange} required />
                </div>
                <button type="submit">Registrar</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default App;