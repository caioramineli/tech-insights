import { useState } from 'react';
import { MdOutlineEmail } from "react-icons/md";
import './style.css';
import { IoIosLock } from "react-icons/io";
import { LuLogIn } from "react-icons/lu";
import { IoCreateOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://backend-tech-insights.onrender.com/login', { email, senha });
            localStorage.setItem('token', response.data.token);
            console.log('Token armazenado:', response.data.token);
            window.location.href = '/'
        } catch (error) {
            console.error('Erro no login:', error.response.data.msg);
            setError(error.response.data.msg);
        }
    }

    return (
        <>
            <div id="container-login">
                <form method="POST" onSubmit={handleSubmit}>
                    <h1>Login</h1>

                    <div className="inputEmail">
                        <MdOutlineEmail />
                        <input
                            name="email"
                            type="text"
                            placeholder="Insira seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="inputSenha">
                        <IoIosLock />
                        <input
                            name='senha'
                            type="password"
                            placeholder="Insira sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>

                    <a id="esqueceuSenha" href='/'>Esqueceu a senha?</a>

                    {error && <span id="spanIncorreto">{error}</span>}

                    <button type="submit" id="btn-entrar">
                        Entrar
                        <LuLogIn />
                    </button>

                    <Link id="a-btn-criar" to="/cadastrar">
                        <button type="button">
                            Criar Conta
                            <IoCreateOutline />
                        </button>
                    </Link>
                </form>
            </div>
        </>
    )
}
