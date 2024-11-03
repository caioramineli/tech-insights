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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './style.css';
import { Modal } from "../../components/Modal";
import { FormEsqueciSenha } from "../../components/FormEsqueciSenha";

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modalEsqueciSenha, setModalEsqueciSenha] = useState(false);
    const { login } = useContext(AuthContext);
    const { carrinho } = useCarrinho();
    const api = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();
    const notifyError = (message) => toast.error(message);

    function openModalEsqueciSenha() {
        setModalEsqueciSenha(true);
        document.body.style.overflow = 'hidden';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await axios.post(api + 'login', { email, senha });
            localStorage.setItem('token', response.data.token);
            login(response.data.token);
            if (carrinho.length > 0) {
                navigate('/entrega')
            } else {
                navigate('/')
            }
        } catch (error) {
            if (error.response.status !== 200) {
                notifyError("E-mail ou senha incorretos!");
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

                    <div className="divInputModerno">
                        <MdOutlineEmail />
                        <input
                            name="email"
                            type="email"
                            placeholder="exemplo@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label className="!bg-slate-100 !left-10">
                            Insira seu email
                        </label>
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

                    <span onClick={openModalEsqueciSenha} className="ml-auto text-cyan-600 relative bottom-[10px] cursor-pointer">
                        Esqueceu a senha?
                    </span>

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

            {modalEsqueciSenha && (
                <Modal setEstado={setModalEsqueciSenha} titulo="Esqueceu a senha?" largura="max-w-2xl">
                    <FormEsqueciSenha
                        email={email}
                        setEmail={(e) => setEmail(e.target.value)} 
                        setModal={setModalEsqueciSenha}
                        />
                </Modal>
            )}

            <ToastContainer autoClose={2500} />
        </>
    )
}
