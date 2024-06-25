import Header from "../../components/Header"
import user from "../../assets/user.png"
import './style.css';

export default function Login() {
    return (
        <>
            <Header/>
            <div id="container-login">
                <form>s
                    <img src={user} alt="user icon" id="user-login" />
                    <h1>Login</h1>
                        <p>Email</p>
                        <input type="text" placeholder="Insira seu email"/>
                        <p>Senha</p>
                        <input type="text" placeholder="Insira sua senha"/>
                    <a href={"/register"}>Esqueceu a senha?</a>
                    <button id="login-entrar">Entrar</button>
                    <button id="login-criar">Criar Conta</button>
                </form>
            </div>
        </>
    )
}