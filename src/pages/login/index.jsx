import { MdOutlineEmail } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { LuLogIn } from "react-icons/lu";
import { IoCreateOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState, useContext } from 'react';
import Loading from '../../components/Loading';
import InputPassword from "../../components/InputPassword";
import { AuthContext } from '../../contexts/AuthContext';
import { useCarrinho } from '../../contexts/contex-Cart';

import './style.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useContext(AuthContext);
    const { carrinho } = useCarrinho();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            const response = await axios.post('https://backend-tech-insights.vercel.app/login', { email, senha });
            localStorage.setItem('token', response.data.token);
            login(response.data.token);
            if (carrinho.length > 0) {
                navigate('/entrega')
            } else {
                navigate('/')
            }
        } catch (error) {
            if (error.response.status !== 200) {
                setError("E-mail ou senha incorretos!");
            }
        } finally {
            setIsSubmitting(false);
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
                            type="email"
                            placeholder="Insira seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="inputSenha">
                        <IoIosLock />
                        <InputPassword
                            placeholder={"Insira sua senha"}
                            value={senha}
                            event={(e) => setSenha(e.target.value)}
                            required={true}
                        />
                    </div>

                    <a id="esqueceuSenha" href='/'>Esqueceu a senha?</a>

                    {error && <span id="spanIncorreto">{error}</span>}

                    {isSubmitting ? (
                        <Loading color='#0891b2' />
                    ) : (
                        <button type="submit" id="btn-entrar">
                            Entrar
                            <LuLogIn />
                        </button>
                    )}

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
