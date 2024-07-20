import { MdOutlineEmail } from "react-icons/md";
import './style.css';
import { IoIosLock } from "react-icons/io";
import { LuLogIn } from "react-icons/lu";
import { IoCreateOutline } from "react-icons/io5";

export default function Login() {
    return (
        <>
            <div id="container-login">
                <form method="POST">
                    <h1>Login</h1>

                    <div className="inputEmail">
                        <MdOutlineEmail />
                        <input name="email" type="text" placeholder="Insira seu email" />
                    </div>

                    <div className="inputSenha">
                        <IoIosLock />
                        <input name='senha' type="password" placeholder="Insira sua senha" />
                    </div>

                    <a id="esqueceuSenha" href='/'>Esqueceu a senha?</a>

                    <span id="spanIncorreto">Email ou senha incorretos</span>

                    <button type="submit" id="btn-entrar">
                        Entrar
                        <LuLogIn />
                    </button>

                    <a id="a-btn-criar" href="/cadastrar">
                        <button type="button">
                            Criar Conta
                            <IoCreateOutline />
                        </button>
                    </a>
                </form>
            </div>
        </>
    )
}