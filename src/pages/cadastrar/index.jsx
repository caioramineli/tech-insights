import './style.css';
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
                        <input name="email" type="text" placeholder="E-mail" />
                        <input name='senha' type="text" placeholder="Senha" />
                    </div>

                    <span>Termos</span>
                    {/* <input type="o" /> */}
                    <button type='submit'>Criar</button>
                    <div id="voltar-login">
                        <p>Já possui cadastro?</p><span>
                            <a href="/login">FazerLogin</a></span>
                    </div>
                </form>
            </div>
        </>
    )
}