
import user from "../../assets/user.png"
import './style.css';

export default function Login() {
    return (
        <>
            <div id="container-login">
                <form method="POST">
                    <img src={user} alt="user icon" id="user-login" />
                    <h1>Login</h1>

                    <label htmlFor='email'>Email:</label>
                    <input name="email" type="text" placeholder="Insira seu email" />

                    <label htmlFor='senha'>Senha:</label>
                    <input name='senha' type="text" placeholder="Insira sua senha" />
                    <a href={'/'}>Esqueceu a senha?</a>

                    <button type="submit" id="btn-entrar">Entrar</button>
                    <a id="a-btn-criar" href={'/cadastrar'}><button type="button" >Criar Conta</button></a>
                </form>
            </div>
        </>
    )
}