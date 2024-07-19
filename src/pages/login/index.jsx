import { MdOutlineEmail } from "react-icons/md";
import './style.css';
import { IoIosLock } from "react-icons/io";

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
                        <input name='senha' type="text" placeholder="Insira sua senha" />
                    </div>

                    <a id="esqueceuSenha" href='/'>Esqueceu a senha?</a>

                    <span id="spanIncorreto">Email ou senha incorretos</span>

                    <button type="submit" id="btn-entrar">Entrar</button>

                    <a id="a-btn-criar" href="/cadastrar">
                        <button type="button" >Criar Conta</button>
                    </a>
                </form>
            </div>
        </>
    )
}