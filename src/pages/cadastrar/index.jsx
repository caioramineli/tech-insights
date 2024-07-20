import './style.css';
import { IoCreateOutline } from 'react-icons/io5';

export default function Cadastrar() {
    return (
        <>
            <div id="containerCadastrar">
                <form method="POST">
                    <h1>Cadastrar-se</h1>
                    <div id='containerInputs'>
                        <input name="nome" type="text" placeholder="Nome completo" />
                        <input name="cpf" type="text" placeholder="CPF" />
                        <input name="data_nasc" type="text" placeholder="Data de nascimento" />
                        <input name="tefone" type="text" placeholder="Telefone celular" />
                        <input name="email" type="email" placeholder="E-mail" />
                        <input name='senha' type="password" placeholder="Senha" />
                    </div>

                    <div className='termos'>
                        <span id='spanCheckbox'><input type="checkbox" id="checkboxTermos" /></span>
                        <label for="checkbox1">Li e estou de acordo com as <span>políticas da empresa e políticas de privacidade.</span></label>
                    </div>

                    <button type='submit'>
                        Criar
                        <IoCreateOutline />
                    </button>

                    <div id="voltar-login">
                        <p>Já possui cadastro?</p>
                        <a href="/login">Fazer Login</a>
                    </div>
                </form>
            </div>
        </>
    )
}